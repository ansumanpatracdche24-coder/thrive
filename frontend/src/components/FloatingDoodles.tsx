import React, { useEffect, useState } from 'react';
import floatingDoodlesImg from '@/assets/floating-doodles.png';

const doodles = ['💜', '✨', '💫', '💖', '🌙', '⭐', '💕', '🔮'];

export const FloatingDoodles: React.FC = () => {
  const [doodleElements, setDoodleElements] = useState<Array<{
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: doodles[Math.floor(Math.random() * doodles.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10,
    }));
    
    setDoodleElements(elements);
  }, []);

  return (
    <div className="floating-doodles">
      {doodleElements.map((doodle) => (
        <div
          key={doodle.id}
          className="doodle fixed text-2xl opacity-20"
          style={{
            left: `${doodle.left}%`,
            animationDelay: `${doodle.delay}s`,
            animationDuration: `${doodle.duration}s`,
          }}
        >
          {doodle.emoji}
        </div>
      ))}
    </div>
  );
};