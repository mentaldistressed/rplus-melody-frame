
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRegistrationStore } from '@/utils/registrationUtils';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isRegistrationEnabled = useRegistrationStore((state) => state.isRegistrationEnabled);
  const toggleRegistration = useRegistrationStore((state) => state.toggleRegistration);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsUserAuthenticated(authenticated);
        if (!authenticated) {
          navigate('/login');
          toast({
            title: "Доступ ограничен",
            description: "Для доступа к панели администратора необходимо авторизоваться",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsUserAuthenticated(false);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [isAuthenticated, navigate, toast]);

  const handleRegistrationToggle = () => {
    toggleRegistration();
    toast({
      title: isRegistrationEnabled ? "Регистрация отключена" : "Регистрация включена",
      description: isRegistrationEnabled 
        ? "Новые пользователи не смогут зарегистрироваться" 
        : "Новые пользователи теперь могут зарегистрироваться",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection="admin" 
        onSectionChange={() => {}}
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Панель администратора
          </h1>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Настройки регистрации</h2>
                <p className="text-gray-600">
                  {isRegistrationEnabled 
                    ? "В данный момент регистрация новых пользователей включена" 
                    : "В данный момент регистрация новых пользователей отключена"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {isRegistrationEnabled ? "Вкл" : "Выкл"}
                </span>
                <Switch 
                  checked={isRegistrationEnabled}
                  onCheckedChange={handleRegistrationToggle}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Управление сайтом</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/')}>
                На главную
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
