
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Music, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Release {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverUrl: string;
  audioUrl: string;
  bandLink: string;
}

interface LatestReleasesProps {
  isVisible: boolean;
}

const LatestReleases = ({ isVisible }: LatestReleasesProps) => {
  const [releases] = useState<Release[]>([
    {
      id: '1',
      title: 'ALASKA PUFFER',
      artist: 'паранойя',
      releaseDate: '20.12.2024',
      coverUrl: 'https://i.imgur.com/X5H3JaU.png',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample3.mp3',
      bandLink: 'https://link.rpluslb.ru/alaska_puffer'
    },
    {
      id: '2',
      title: 'распять',
      artist: 'greyrock, tewiq, madk1d',
      releaseDate: '14.03.2025',
      coverUrl: 'https://i.imgur.com/bJBzUFE.png',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample1.mp3',
      bandLink: 'https://link.rpluslb.ru/raspyat'
    },
    {
      id: '3',
      title: 'ножи',
      artist: 'блэйзи?',
      releaseDate: '21.02.2025',
      coverUrl: 'https://i.imgur.com/s6IqXSv.png',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample2.mp3',
      bandLink: 'https://link.rpluslb.ru/nozhi_b'
    }
  ]);
  
  const isMobile = useIsMobile();

  return (
    <section className={cn(
      "py-16 sm:py-20 bg-white text-black transition-all duration-700 px-4 sm:px-6",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center font-montserrat tracking-tight">
          <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Наши выпущенные релизы
          </span>
        </h2>
        
        <div className="w-32 h-1 bg-gradient-to-r from-gray-200 via-black to-gray-200 mx-auto mb-12 sm:mb-16"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {releases.map((release) => (
            <a 
              key={release.id}
              href={release.bandLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-all duration-500 hover:-translate-y-2 focus:outline-none"
            >
              <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={release.coverUrl} 
                    alt={release.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between">
                    <div className="p-4 text-white w-full flex justify-end">
                      <span className="inline-flex items-center text-sm bg-black/70 rounded-full py-1.5 px-3.5 backdrop-blur-sm">
                        <Music size={14} className="mr-1.5" /> Слушать
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl mb-1 truncate tracking-tight">{release.title}</h3>
                  <p className="text-gray-600 mb-4 truncate font-medium">{release.artist}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-1.5" />
                      <span>{release.releaseDate}</span>
                    </div>
                    
                    <span className="text-black flex items-center gap-1.5 font-medium group-hover:underline transition-all">
                      {isMobile ? 'Открыть' : 'Слушать на площадках'}
                      <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
