
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ContactsSection from '@/components/ContactsSection';
import LoginSection from '@/components/LoginSection';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/utils/authUtils';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Ничего особенного не делаем при первой загрузке
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
        isAuthenticated={isAuthenticated()}
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
