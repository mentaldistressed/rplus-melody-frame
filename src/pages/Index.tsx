
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем состояние аутентификации при загрузке страницы
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsUserAuthenticated(authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsUserAuthenticated(false);
      }
    };
    
    checkAuth();

    // Устанавливаем слушатель событий аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
    if (section === 'contacts') {
      navigate('/contacts');
    } else if (section === 'login') {
      navigate('/login');
    } else if (section === 'register') {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection="home" 
        onSectionChange={handleSectionChange} 
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative">
        <HomeSection isActive={true} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
