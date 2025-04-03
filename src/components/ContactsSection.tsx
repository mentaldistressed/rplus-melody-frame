
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Mail, MessageSquare } from 'lucide-react';

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
        "fixed inset-0 w-full min-h-screen pt-24 px-6 md:px-12 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 
            className={cn(
              "text-3xl md:text-5xl font-bold text-center opacity-0",
              isLoaded && "animate-slide-up"
            )}
          >
            Контакты
          </h2>
          <p 
            className={cn(
              "text-lg md:text-xl text-center opacity-0 max-w-2xl mx-auto",
              isLoaded && "animate-slide-up animate-delay-100"
            )}
          >
            Свяжитесь с нами, если хотите обсудить сотрудничество или у Вас есть вопросы.
          </p>
        </div>

        <div 
          className={cn(
            "mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-0",
            isLoaded && "animate-fade-in animate-delay-200"
          )}
        >
          <a 
            href="mailto:info@rpluslb.ru" 
            className="block p-8 rounded-lg border bg-white shadow-sm hover:shadow-md hover:bg-secondary/10 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-accent group-hover:bg-accent-foreground group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium">Email</h3>
            </div>
            <p className="text-muted-foreground mb-4">Напишите нам письмо на электронную почту</p>
            <p className="font-medium group-hover:underline">info@rpluslb.ru</p>
          </a>
          
          <a 
            href="https://t.me/rpluslabel" 
            target="_blank"
            rel="noopener noreferrer" 
            className="block p-8 rounded-lg border bg-white shadow-sm hover:shadow-md hover:bg-secondary/10 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-accent group-hover:bg-accent-foreground group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium">Telegram</h3>
            </div>
            <p className="text-muted-foreground mb-4">Свяжитесь с нами в Telegram</p>
            <p className="font-medium group-hover:underline">@rpluslabel</p>
          </a>
        </div>
        
        <div 
          className={cn(
            "mt-20 max-w-3xl mx-auto text-center opacity-0",
            isLoaded && "animate-fade-in animate-delay-300"
          )}
        >
          <p className="text-muted-foreground">
            Мы работаем с артистами по всему миру, поэтому связаться с Вами для нас не составит никаких проблем.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
