
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ContactsSection from '@/components/ContactsSection';
import LoginSection from '@/components/LoginSection';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/utils/authUtils';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Проверяем состояние аутентификации при загрузке страницы
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
    };
    
    checkAuth();

    // Устанавливаем слушатель событий аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN') {
          setIsUserAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setIsUserAuthenticated(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthenticated]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative">
        <HomeSection isActive={activeSection === 'home'} />
        <ContactsSection isActive={activeSection === 'contacts'} />
        <LoginSection 
          isActive={activeSection === 'login'} 
          onSectionChange={handleSectionChange}
        />
        <RegisterSection 
          isActive={activeSection === 'register'} 
          onSectionChange={handleSectionChange}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
