
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin, Share2 } from 'lucide-react';

interface ContactsSectionProps {
  isActive: boolean;
}

const ContactsSection = ({ isActive }: ContactsSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);
    }
  }, [isActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      // Сбросим состояние отправки через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

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
              "text-3xl md:text-5xl font-bold text-center opacity-0 font-montserrat",
              isLoaded && "animate-slide-up"
            )}
          >
            Контакты
          </h2>
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
            "mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto opacity-0",
            isLoaded && "animate-fade-in animate-delay-200"
          )}
        >
          <a 
            href="mailto:info@rpluslb.ru" 
            className="block p-8 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-accent group-hover:bg-black group-hover:text-white transition-colors">
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
            className="block p-8 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-accent group-hover:bg-black group-hover:text-white transition-colors">
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
            "mt-16 max-w-4xl mx-auto opacity-0",
            isLoaded && "animate-fade-in animate-delay-300"
          )}
        >
          <div className="bg-white rounded-xl border p-8 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-center font-montserrat">
              Отправьте нам сообщение
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-full mb-4">
                  <Send className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-medium mb-2">Сообщение отправлено!</h4>
                <p className="text-gray-600">Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Ваш Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "px-6 py-3 bg-black text-white rounded-lg flex items-center",
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800",
                      "transition-all transform hover:-translate-y-0.5"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить сообщение <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div 
          className={cn(
            "mt-12 max-w-3xl mx-auto text-center opacity-0",
            isLoaded && "animate-fade-in animate-delay-400"
          )}
        >
          <p className="text-gray-600 flex items-center justify-center space-x-2">
            <Share2 size={16} />
            <span>Поделитесь нашими контактами с друзьями и коллегами музыкантами</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
