
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

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
  const [releases, setReleases] = useState<Release[]>([
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

  return (
    <section className={cn(
      "py-20 bg-white text-black transition-opacity duration-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Наши выпущенные релизы
        </h2>
        
        <div className="w-10 h-1 bg-black mx-auto mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {releases.map((release) => (
            <div key={release.id} className="bg-white border border-gray-200 transition-transform hover:scale-105 shadow-sm">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={release.coverUrl} 
                  alt={release.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Выпущено: {release.releaseDate}</span>
                  <a 
                    href={release.bandLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    <Play size={16} /> Слушать
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
