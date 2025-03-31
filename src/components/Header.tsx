
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    onSectionChange(section);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            className="text-2xl md:text-3xl font-bold cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => handleNavigation('home')}
          >
            rplus
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation('home')}
            className={cn(
              "link-underline text-sm uppercase tracking-wider font-medium",
              activeSection === 'home' ? "opacity-100" : "opacity-70 hover:opacity-100"
            )}
          >
            Главная
          </button>
          <button
            onClick={() => handleNavigation('contacts')}
            className={cn(
              "link-underline text-sm uppercase tracking-wider font-medium",
              activeSection === 'contacts' ? "opacity-100" : "opacity-70 hover:opacity-100"
            )}
          >
            Контакты
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={cn(
            "block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out",
            isMenuOpen && "translate-y-2 rotate-45"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out",
            isMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out",
            isMenuOpen && "-translate-y-2 -rotate-45"
          )} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-background fixed inset-x-0 top-[76px] overflow-hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-[300px] border-b border-muted" : "max-h-0"
      )}>
        <div className="p-6 flex flex-col space-y-6">
          <button
            onClick={() => handleNavigation('home')}
            className={cn(
              "text-left text-lg transition-all",
              activeSection === 'home' ? "font-medium" : "opacity-70"
            )}
          >
            Главная
          </button>
          <button
            onClick={() => handleNavigation('contacts')}
            className={cn(
              "text-left text-lg transition-all",
              activeSection === 'contacts' ? "font-medium" : "opacity-70"
            )}
          >
            Контакты
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
