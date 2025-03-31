
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

interface HomeSectionProps {
  isActive: boolean;
}

const HomeSection = ({ isActive }: HomeSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);
    }
  }, [isActive]);

  return (
    <section 
      className={cn(
        "fixed inset-0 w-full min-h-screen pt-24 px-6 md:px-12 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 
                className={cn(
                  "text-4xl md:text-6xl lg:text-7xl font-bold opacity-0",
                  isLoaded && "animate-slide-up"
                )}
              >
                музыкальный лейбл
              </h2>
              <h1 
                className={cn(
                  "text-6xl md:text-7xl lg:text-8xl font-bold opacity-0",
                  isLoaded && "animate-slide-up animate-delay-100"
                )}
              >
                rplus
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl opacity-0 leading-relaxed",
                  isLoaded && "animate-slide-up animate-delay-200"
                )}
              >
                Музыкальный лейбл с фокусом на электронной музыке, объединяющий талантливых артистов и создающий неповторимое звучание.
              </p>
            </div>
            
            <div 
              className={cn(
                "opacity-0", 
                isLoaded && "animate-slide-up animate-delay-300"
              )}
            >
              <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                Слушать сейчас
              </button>
            </div>
          </div>
          
          <div 
            className={cn(
              "aspect-square bg-gray-100 rounded-lg flex items-center justify-center opacity-0",
              isLoaded && "animate-fade-in animate-delay-400"
            )}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Music size={120} className="animate-pulse-slow" />
              <div className="absolute w-24 h-24 rounded-full bg-black opacity-10 animate-pulse-slow" />
              <div className="absolute w-48 h-48 rounded-full border border-black opacity-20 animate-pulse-slow" />
              <div className="absolute w-72 h-72 rounded-full border border-black opacity-10 animate-pulse-slow" />
            </div>
          </div>
        </div>
        
        <div 
          className={cn(
            "mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0",
            isLoaded && "animate-fade-in animate-delay-500"
          )}
        >
          {[
            {
              title: "Музыка",
              description: "Электронная музыка разных стилей и направлений"
            },
            {
              title: "Релизы",
              description: "Регулярные выпуски новых альбомов и синглов"
            },
            {
              title: "Артисты",
              description: "Талантливые музыканты со всего мира"
            }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-lg border hover:bg-secondary/50 transition-colors">
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
