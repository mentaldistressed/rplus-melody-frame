
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginSection from '@/components/LoginSection';
import { useAuth } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsUserAuthenticated(authenticated);
        if (authenticated) {
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsUserAuthenticated(false);
      }
    };
    
    checkAuth();
  }, [isAuthenticated, navigate]);

  const handleSectionChange = (section: string) => {
    if (section === 'register') {
      navigate('/register');
    } else if (section === 'home') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        activeSection="login" 
        onSectionChange={() => {}}
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative pt-0">
        <LoginSection 
          isActive={true}
          onSectionChange={handleSectionChange}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
