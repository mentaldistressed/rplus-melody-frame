
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Phone, MapPin, ExternalLink } from 'lucide-react';

interface ContactsSectionProps {
  isActive: boolean;
}

const ContactsSection = ({ isActive }: ContactsSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);
    }
  }, [isActive]);

  return (
    <section 
      className={cn(
        "w-full min-h-screen pt-32 sm:pt-36 pb-16 px-4 sm:px-6 md:px-12 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl mx-auto">
          <h1 
            className={cn(
              "text-4xl md:text-5xl font-bold text-center opacity-0 font-montserrat bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent",
              isLoaded && "animate-slide-up"
            )}
          >
            Контакты
          </h1>
          <p 
            className={cn(
              "text-lg md:text-xl text-center opacity-0 max-w-2xl mx-auto leading-relaxed",
              isLoaded && "animate-slide-up animate-delay-100"
            )}
          >
            Свяжитесь с нами, если хотите обсудить сотрудничество или у Вас есть вопросы. 
            Мы открыты для новых интересных проектов.
          </p>
        </div>

        <div 
          className={cn(
            "mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto opacity-0",
            isLoaded && "animate-fade-in animate-delay-200"
          )}
        >
          <a 
            href="mailto:info@rpluslb.ru" 
            className="block p-10 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-accent group-hover:bg-black group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Email</h3>
            </div>
            <p className="text-muted-foreground mb-6">Служба поддержки</p>
            <p className="font-medium text-lg group-hover:underline flex items-center">
              info@rpluslb.ru
              <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
            </p>
          </a>

          <a 
            href="mailto:artists@rpluslb.ru" 
            className="block p-10 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-accent group-hover:bg-black group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Email</h3>
            </div>
            <p className="text-muted-foreground mb-6">ХУЙХУХЙУХЙУХЙ</p>
            <p className="font-medium text-lg group-hover:underline flex items-center">
              artists@rpluslb.ru
              <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
            </p>
          </a>

          {/* <a 
            href="https://t.me/rpluslabel" 
            target="_blank"
            rel="noopener noreferrer" 
            className="block p-10 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-accent group-hover:bg-black group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Telegram</h3>
            </div>
            <p className="text-muted-foreground mb-6">Свяжитесь с нами в Telegram</p>
            <p className="font-medium text-lg group-hover:underline flex items-center">
              @rpluslabel
              <ExternalLink className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
            </p>
          </a> */}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Мы ценим ваше время и стремимся к оперативному ответу на все обращения.
            Обычно мы отвечаем в течение 24 часов в рабочие дни.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
