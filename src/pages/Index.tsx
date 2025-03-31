
import { useState } from 'react';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ContactsSection from '@/components/ContactsSection';
import LoginSection from '@/components/LoginSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="flex-grow relative">
        <HomeSection isActive={activeSection === 'home'} />
        <ContactsSection isActive={activeSection === 'contacts'} />
        <LoginSection isActive={activeSection === 'login'} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
