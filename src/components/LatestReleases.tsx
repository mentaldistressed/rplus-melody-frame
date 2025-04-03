
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, ExternalLink } from 'lucide-react';
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
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    // Создаем аудиоэлементы для каждого релиза
    releases.forEach((release) => {
      if (!audioRefs.current[release.id]) {
        const audio = new Audio(release.audioUrl);
        audio.addEventListener('ended', () => {
          setPlayingId(null);
        });
        audioRefs.current[release.id] = audio;
      }
    });

    // Очищаем аудиоэлементы при размонтировании
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [releases]);

  const togglePlay = (releaseId: string) => {
    // Если текущий трек играет, останавливаем его
    if (playingId === releaseId) {
      audioRefs.current[releaseId].pause();
      setPlayingId(null);
      return;
    }

    // Если играет другой трек, останавливаем его
    if (playingId !== null && audioRefs.current[playingId]) {
      audioRefs.current[playingId].pause();
    }

    // Воспроизводим выбранный трек
    audioRefs.current[releaseId].currentTime = 0;
    audioRefs.current[releaseId].play().catch(error => {
      console.error('Ошибка воспроизведения:', error);
    });
    setPlayingId(releaseId);
  };

  return (
    <section className={cn(
      "py-16 sm:py-20 bg-white text-black transition-opacity duration-700 px-4 sm:px-6",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center">
          Наши выпущенные релизы
        </h2>
        
        <div className="w-10 h-1 bg-black mx-auto mb-12 sm:mb-16"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {releases.map((release) => (
            <div 
              key={release.id} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden relative group">
                <img 
                  src={release.coverUrl} 
                  alt={release.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(release.id)}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hover:bg-gray-100"
                    aria-label={playingId === release.id ? "Приостановить" : "Воспроизвести"}
                  >
                    {playingId === release.id ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>
                </div>
              </div>
              
              <div className="p-5 sm:p-6">
                <h3 className="font-bold text-xl mb-1 truncate">{release.title}</h3>
                <p className="text-gray-600 mb-4 truncate">{release.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Выпущено: {release.releaseDate}</span>
                  <a 
                    href={release.bandLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    <ExternalLink size={14} /> Слушать
                  </a>
                </div>

                {/* Мобильная кнопка воспроизведения */}
                {isMobile && (
                  <button
                    onClick={() => togglePlay(release.id)}
                    className="w-full mt-4 py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    {playingId === release.id ? (
                      <>
                        <Pause size={16} /> Пауза
                      </>
                    ) : (
                      <>
                        <Play size={16} /> Слушать трек
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
