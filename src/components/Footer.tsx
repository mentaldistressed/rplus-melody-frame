
import { cn } from '@/lib/utils';
import { Mail, AlignJustify, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-6 py-8 md:py-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <AlignJustify className="mr-3" />
            <h2 className="text-2xl font-bold uppercase">rplus</h2>
          </div>
          
          <div className="text-sm text-gray-600">
            Создавая музыку будущего.
          </div>
          
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            <a 
              href="https://vk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="VK"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                <path d="M21.5797 15.2025C21.5312 15.1242 21.2815 14.5777 19.8765 13.274C18.4027 11.9074 18.5787 12.1086 20.3468 9.71838C21.4143 8.22428 21.8417 7.30507 21.7293 6.93271C21.6229 6.57868 20.7991 6.65708 20.7991 6.65708L18.1065 6.67055C18.1065 6.67055 17.9353 6.64853 17.8092 6.7284C17.6871 6.807 17.6069 6.9871 17.6069 6.9871C17.6069 6.9871 17.1949 8.18123 16.6335 9.19356C15.452 11.3376 14.9834 11.4285 14.8128 11.3165C14.401 11.0502 14.503 10.1385 14.503 9.4914C14.503 7.42274 14.7694 6.54926 13.8311 6.36949C13.5279 6.30542 13.3028 6.26334 12.4767 6.25682C11.4136 6.24826 10.5151 6.25987 10.0214 6.45394C9.68911 6.58179 9.43047 6.86583 9.55221 6.88236C9.70315 6.90194 10.0375 6.97882 10.2642 7.24114C10.559 7.58053 10.5502 8.44495 10.5502 8.44495C10.5502 8.44495 10.6975 11.0664 10.18 11.3267C9.82602 11.5041 9.33895 11.1181 8.29489 9.1728C7.7533 8.17839 7.35213 7.07938 7.35213 7.07938C7.35213 7.07938 7.28348 6.90573 7.16327 6.81378C7.01711 6.70229 6.81139 6.66484 6.81139 6.66484L4.24149 6.6783C4.24149 6.6783 3.86761 6.68726 3.74893 6.82934C3.64359 6.95414 3.74131 7.21188 3.74131 7.21188C3.74131 7.21188 5.87057 12.0159 8.2752 14.4417C10.4753 16.6621 13 16.5414 13 16.5414H14.0916C14.0916 16.5414 14.4041 16.511 14.5634 16.339C14.7096 16.1802 14.7046 15.9224 14.7046 15.9224C14.7046 15.9224 14.6871 14.5132 15.3336 14.3117C15.9712 14.1133 16.7746 15.6688 17.6251 16.2306C18.2711 16.6514 18.7646 16.5668 18.7646 16.5668L21.1686 16.5414C21.1686 16.5414 22.3995 16.4746 21.8322 15.5599C21.7913 15.4861 21.6282 15.2808 21.5797 15.2025Z" fill="currentColor"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://t.me/rplus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Telegram"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href="mailto:info@rplus.com" 
              className="hover:opacity-70 transition-opacity"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-8"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-xs text-gray-600 mb-6 md:mb-0">
            © {currentYear} rplus. Все права защищены.
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 text-xs text-gray-600">
            <Link to="/privacy-policy" className="mb-2 md:mb-0 hover:text-black transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="mb-2 md:mb-0 hover:text-black transition-colors">
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
