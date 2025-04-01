
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterSection from '@/components/RegisterSection';
import { useAuth } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
    if (section === 'login') {
      navigate('/login');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection="register" 
        onSectionChange={() => {}}
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative pt-24">
        <RegisterSection 
          isActive={true}
          onSectionChange={handleSectionChange}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
