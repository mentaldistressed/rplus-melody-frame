
import { cn } from '@/lib/utils';
import { Mail, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-4 sm:px-6 py-12 md:py-16 bg-white text-black border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10">
          <Link to="/" className="flex items-center mb-8 md:mb-0 group">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Logo className="mr-4 relative z-10" size="medium" />
            </div>
            <h2 className="text-3xl font-bold font-montserrat">rplus</h2>
          </Link>
          
          <div className="flex items-center space-x-7">
            <a 
              href="https://vk.com/rplus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity p-2 hover:-translate-y-1 transition-transform"
              aria-label="VK"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path d="M21.5797 15.2025C21.5312 15.1242 21.2815 14.5777 19.8765 13.274C18.4027 11.9074 18.5787 12.1086 20.3468 9.71838C21.4143 8.22428 21.8417 7.30507 21.7293 6.93271C21.6229 6.57868 20.7991 6.65708 20.7991 6.65708L18.1065 6.67055C18.1065 6.67055 17.9353 6.64853 17.8092 6.7284C17.6871 6.807 17.6069 6.9871 17.6069 6.9871C17.6069 6.9871 17.1949 8.18123 16.6335 9.19356C15.452 11.3376 14.9834 11.4285 14.8128 11.3165C14.401 11.0502 14.503 10.1385 14.503 9.4914C14.503 7.42274 14.7694 6.54926 13.8311 6.36949C13.5279 6.30542 13.3028 6.26334 12.4767 6.25682C11.4136 6.24826 10.5151 6.25987 10.0214 6.45394C9.68911 6.58179 9.43047 6.86583 9.55221 6.88236C9.70315 6.90194 10.0375 6.97882 10.2642 7.24114C10.559 7.58053 10.5502 8.44495 10.5502 8.44495C10.5502 8.44495 10.6975 11.0664 10.18 11.3267C9.82602 11.5041 9.33895 11.1181 8.29489 9.1728C7.7533 8.17839 7.35213 7.07938 7.35213 7.07938C7.35213 7.07938 7.28348 6.90573 7.16327 6.81378C7.01711 6.70229 6.81139 6.66484 6.81139 6.66484L4.24149 6.6783C4.24149 6.6783 3.86761 6.68726 3.74893 6.82934C3.64359 6.95414 3.74131 7.21188 3.74131 7.21188C3.74131 7.21188 5.87057 12.0159 8.2752 14.4417C10.4753 16.6621 13 16.5414 13 16.5414H14.0916C14.0916 16.5414 14.4041 16.511 14.5634 16.339C14.7096 16.1802 14.7046 15.9224 14.7046 15.9224C14.7046 15.9224 14.6871 14.5132 15.3336 14.3117C15.9712 14.1133 16.7746 15.6688 17.6251 16.2306C18.2711 16.6514 18.7646 16.5668 18.7646 16.5668L21.1686 16.5414C21.1686 16.5414 22.3995 16.4746 21.8322 15.5599C21.7913 15.4861 21.6282 15.2808 21.5797 15.2025Z" fill="currentColor"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/rplus_label" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity p-2 hover:-translate-y-1 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://t.me/lbrplus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity p-2 hover:-translate-y-1 transition-transform"
              aria-label="Telegram"
            >
              <MessageCircle size={24} />
            </a>
            <a 
              href="mailto:info@rpluslb.ru" 
              className="hover:opacity-70 transition-opacity p-2 hover:-translate-y-1 transition-transform"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>
        
        {/* Middle section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3 text-gray-600">
              <p><span className="font-semibold">Email:</span> info@rpluslb.ru</p>
              <p><span className="font-semibold">Телеграм:</span> @rpluslabel</p>
              <Link to="/contacts" className="inline-flex items-center text-black hover:underline mt-2 group">
                Связаться с нами <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-gray-600 leading-relaxed">
              rplus — молодой музыкальный лейбл, стремящийся найти и поддержать талантливых музыкантов. Мы помогаем артистам делиться своим творчеством с миром.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                Главная
              </Link>
              <Link to="/contacts" className="text-gray-600 hover:text-black transition-colors">
                Контакты
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-black transition-colors">
                Вход
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600 order-2 md:order-1">
            © {currentYear} rplus. Все права защищены.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-center sm:space-x-8 text-sm text-gray-600 space-y-3 sm:space-y-0 order-1 md:order-2">
            <Link to="/privacy-policy" className="hover:text-black transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-black transition-colors">
              Условия использования
            </Link>
            <Link to="/cookies" className="hover:text-black transition-colors">
              Политика cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
