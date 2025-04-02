
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import AudioEqualizer from './AudioEqualizer';
import LatestReleases from './LatestReleases';
import Logo from './Logo';

interface HomeSectionProps {
  isActive: boolean;
}

const HomeSection = ({ isActive }: HomeSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showReleases, setShowReleases] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);

      const handleScroll = () => {
        if (sectionRef.current) {
          const scrollPosition = window.scrollY + window.innerHeight;
          const releasesPosition = sectionRef.current.offsetTop + 400;
          
          if (scrollPosition > releasesPosition) {
            setShowReleases(true);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isActive]);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "w-full min-h-screen pt-24 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="px-6 md:px-12 pb-20">
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
                  Создавая музыку будущего.
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
                "aspect-square bg-gray-100 rounded-lg flex items-center justify-center opacity-0 relative",
                isLoaded && "animate-fade-in animate-delay-400"
              )}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <AudioEqualizer />
                <div className="absolute flex items-center justify-center z-10">
                  <Logo size="large" className="w-32 h-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LatestReleases isVisible={showReleases} />
    </section>
  );
};

export default HomeSection;
