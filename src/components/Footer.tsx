
import { cn } from '@/lib/utils';
import { Mail, AlignJustify, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-6 py-8 md:py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <AlignJustify className="mr-3" />
            <h2 className="text-2xl font-bold uppercase">rplus</h2>
          </div>
          
          <div className="text-sm text-gray-400">
            Раздвигая границы звука.
          </div>
          
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            <a 
              href="https://vk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="VK"
            >
              VK
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
              href="mailto:info@rplus.com" 
              className="hover:opacity-70 transition-opacity"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-800 mb-8"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-xs text-gray-400 mb-6 md:mb-0">
            © {currentYear} rplus. Все права защищены.
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 text-xs text-gray-400">
            <Link to="/privacy-policy" className="mb-2 md:mb-0 hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="mb-2 md:mb-0 hover:text-white transition-colors">
              Условия использования
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Политика cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
