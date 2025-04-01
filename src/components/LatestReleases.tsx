
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
}

interface LatestReleasesProps {
  isVisible: boolean;
}

const LatestReleases = ({ isVisible }: LatestReleasesProps) => {
  const [releases, setReleases] = useState<Release[]>([
    {
      id: '1',
      title: 'ORTEGA DMT',
      artist: 'Grant Ortega',
      releaseDate: '28.03.2025',
      coverUrl: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample3.mp3'
    },
    {
      id: '2',
      title: 'Не скрывай ты от меня',
      artist: 'erix',
      releaseDate: '21.03.2025',
      coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample1.mp3'
    },
    {
      id: '3',
      title: 'idgaf',
      artist: 'keelpaint',
      releaseDate: '21.03.2025',
      coverUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&h=500&fit=crop',
      audioUrl: 'https://filesamples.com/samples/audio/mp3/sample2.mp3'
    }
  ]);

  const playAudio = (audioUrl: string, title: string, artist: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
    console.log(`Playing: ${title} by ${artist}`);
  };

  return (
    <section className={cn(
      "py-20 bg-white text-black transition-opacity duration-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Последние Релизы
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
                  <button 
                    onClick={() => playAudio(release.audioUrl, release.title, release.artist)}
                    className="text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    <Play size={16} /> Слушать
                  </button>
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
