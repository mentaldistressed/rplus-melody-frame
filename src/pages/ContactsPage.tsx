
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactsSection from '@/components/ContactsSection';
import { useAuth } from '@/utils/authUtils';

const ContactsPage = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
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
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection="contacts" 
        onSectionChange={() => {}}
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative pt-24">
        <ContactsSection isActive={true} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactsPage;
