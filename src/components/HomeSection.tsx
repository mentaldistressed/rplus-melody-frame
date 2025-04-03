
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import AudioEqualizer from './AudioEqualizer';
import LatestReleases from './LatestReleases';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, MusicIcon, Headphones, ArrowRight } from 'lucide-react';

interface HomeSectionProps {
  isActive: boolean;
}

const HomeSection = ({ isActive }: HomeSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showReleases, setShowReleases] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const releasesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);

      const handleScroll = () => {
        if (sectionRef.current && releasesRef.current) {
          const scrollPosition = window.scrollY + window.innerHeight * 0.8;
          const releasesPosition = releasesRef.current.offsetTop;
          
          if (scrollPosition > releasesPosition) {
            setShowReleases(true);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      // Вызовем функцию один раз для проверки начального положения
      setTimeout(handleScroll, 500);
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isActive]);

  const scrollToReleases = () => {
    if (releasesRef.current) {
      window.scrollTo({
        top: releasesRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "w-full min-h-[100dvh] pt-32 sm:pt-36 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="px-4 sm:px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-6">
                <h2 
                  className={cn(
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold opacity-0",
                    isLoaded && "animate-slide-up"
                  )}
                >
                  <span className="text-black">музыкальный лейбл</span>
                </h2>
                <h1 
                  className={cn(
                    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold opacity-0 font-montserrat tracking-tight bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent",
                    isLoaded && "animate-slide-up animate-delay-100"
                  )}
                >
                  rplus
                </h1>
                <p 
                  className={cn(
                    "text-lg md:text-xl opacity-0 leading-relaxed text-gray-700",
                    isLoaded && "animate-slide-up animate-delay-200"
                  )}
                >
                  Профессиональная запись, продюсирование и продвижение 
                  <span className="hidden sm:inline"> талантливых</span> музыкантов
                </p>
              </div>
              
              <div 
                className={cn(
                  "opacity-0 flex flex-wrap gap-4", 
                  isLoaded && "animate-slide-up animate-delay-300"
                )}
              >
                <a
                  href="/contacts"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                >
                  Наши контакты
                </a>
                
                <button
                  onClick={scrollToReleases}
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  Наши релизы 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
              
              <div className={cn(
                "hidden sm:flex items-center gap-4 text-gray-600 opacity-0", 
                isLoaded && "animate-fade-in animate-delay-500"
              )}>
                <MusicIcon size={20} />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <Headphones size={20} />
              </div>
            </div>
            
            <div 
              className={cn(
                "relative aspect-square flex items-center justify-center opacity-0 order-1 md:order-2",
                isLoaded && "animate-fade-in animate-delay-400"
              )}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-3/5 h-3/5">
                    <div className="rounded-full overflow-hidden bg-white shadow-2xl p-8 animate-pulse-slow">
                      <Logo size="large" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={releasesRef}>
        <LatestReleases isVisible={showReleases} />
      </div>
      
      {/* Декоративный элемент */}
      <div className="relative w-full overflow-hidden h-24 md:h-32 mt-12">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white"></div>
      </div>
    </section>
  );
};

export default HomeSection;
