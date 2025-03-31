
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-6 py-12 md:px-12 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-muted-foreground">
          © {currentYear} rplus. Все права защищены.
        </div>
        <div className="flex items-center space-x-6">
          {["Spotify", "SoundCloud", "Bandcamp"].map((platform, index) => (
            <a 
              key={index}
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
