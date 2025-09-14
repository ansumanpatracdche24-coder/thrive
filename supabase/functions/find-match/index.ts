import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          bio: string | null
          phone: string | null
          location: string | null
          situation: string | null
          birthday: string | null
          age: number | null
          gender: string | null
          interests: any
          personality_vector: number[] | null
          is_active: boolean
          is_verified: boolean
          is_searching: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          bio?: string | null
          phone?: string | null
          location?: string | null
          situation?: string | null
          birthday?: string | null
          age?: number | null
          gender?: string | null
          interests?: any
          personality_vector?: number[] | null
          is_active?: boolean
          is_verified?: boolean
          is_searching?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          bio?: string | null
          phone?: string | null
          location?: string | null
          situation?: string | null
          birthday?: string | null
          age?: number | null
          gender?: string | null
          interests?: any
          personality_vector?: number[] | null
          is_active?: boolean
          is_verified?: boolean
          is_searching?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          profile1_id: string
          profile2_id: string
          status: string
          match_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile1_id: string
          profile2_id: string
          status?: string
          match_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile1_id?: string
          profile2_id?: string
          status?: string
          match_score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')!
    
    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const userId = user.id

    console.log(`Find match request from user: ${userId}`)

    // Step 1: Set current user's is_searching status to true
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        is_searching: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating user search status:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update search status' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Set user ${userId} to searching status`)

    // Step 2: Find another user who is also searching (excluding current user)
    const { data: potentialMatches, error: searchError } = await supabaseClient
      .from('profiles')
      .select('id, name, bio, age, location, gender, interests')
      .eq('is_searching', true)
      .eq('is_active', true)
      .neq('id', userId)
      .limit(1)

    if (searchError) {
      console.error('Error searching for matches:', searchError)
      return new Response(
        JSON.stringify({ error: 'Failed to search for matches' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Step 3: If no match found, return searching status
    if (!potentialMatches || potentialMatches.length === 0) {
      console.log(`No matches found for user ${userId}, staying in search mode`)
      
      return new Response(
        JSON.stringify({ 
          status: 'searching',
          message: 'Looking for your perfect match...',
          userId: userId
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Step 4: Match found! Create match record and update both users
    const matchedUser = potentialMatches[0]
    console.log(`Match found! User ${userId} matched with ${matchedUser.id}`)

    // Ensure consistent ordering for profile IDs (smaller ID first)
    const profile1Id = userId < matchedUser.id ? userId : matchedUser.id
    const profile2Id = userId < matchedUser.id ? matchedUser.id : userId

    // Create the match record
    const { data: newMatch, error: matchError } = await supabaseClient
      .from('matches')
      .insert({
        profile1_id: profile1Id,
        profile2_id: profile2Id,
        status: 'matched',
        match_score: 0.85, // Simple default score, replace with AI logic later
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (matchError) {
      console.error('Error creating match:', matchError)
      return new Response(
        JSON.stringify({ error: 'Failed to create match' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Set both users' is_searching status to false
    const { error: updateUsersError } = await supabaseClient
      .from('profiles')
      .update({ 
        is_searching: false,
        updated_at: new Date().toISOString()
      })
      .in('id', [userId, matchedUser.id])

    if (updateUsersError) {
      console.error('Error updating users search status:', updateUsersError)
      // Don't return error here as match is already created
    }

    console.log(`Successfully created match ${newMatch.id} between users ${userId} and ${matchedUser.id}`)

    // Return successful match details
    return new Response(
      JSON.stringify({
        status: 'matched',
        message: 'Match found!',
        match: {
          id: newMatch.id,
          matchedUser: {
            id: matchedUser.id,
            name: matchedUser.name,
            bio: matchedUser.bio,
            age: matchedUser.age,
            location: matchedUser.location,
            gender: matchedUser.gender,
            interests: matchedUser.interests
          },
          matchScore: newMatch.match_score,
          createdAt: newMatch.created_at
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error in find-match function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
