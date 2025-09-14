import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-mystical flex items-center justify-center p-6">
      <div className="text-center animate-mystical-entrance">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-accent rounded-full flex items-center justify-center opacity-20">
            <Heart className="w-16 h-16 text-accent-foreground" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-heading font-bold text-gradient">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-heading font-bold mb-4">
          Lost in the Mystical Realm
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for seems to have vanished into the cosmic void. 
          Let's guide you back to where the magic happens.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="btn-secondary-mystical mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="btn-mystical"
          >
            <Heart className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-8">
          ✨ Let the stars guide you back to love ✨
        </p>
      </div>
    </div>
  );
};

export default NotFound;
