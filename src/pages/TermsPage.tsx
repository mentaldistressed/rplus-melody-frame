
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/authUtils';

const TermsPage = () => {
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
        activeSection="none" 
        onSectionChange={() => {}}
        isAuthenticated={isUserAuthenticated}
      />
      
      <main className="flex-grow relative pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Условия использования</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Последнее обновление: 02.04.2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Принятие условий</h2>
              <p>Добро пожаловать на сайт музыкального лейбла rplus. Пользуясь нашим сайтом, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте наш сайт.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Изменения условий</h2>
              <p>Мы оставляем за собой право изменять, модифицировать или заменять любую часть этих Условий использования, публикуя обновления и изменения на нашем сайте. Ваше продолжающееся использование сайта после публикации любых изменений означает принятие и согласие с такими изменениями.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Доступ к услугам</h2>
              <p>Мы предоставляем вам ограниченную, неисключительную, непередаваемую лицензию на доступ и использование нашего сайта и услуг строго в соответствии с настоящими Условиями использования.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Учетные записи пользователей</h2>
              <p>Для доступа к некоторым функциям нашего сайта вам может потребоваться создать учетную запись. Вы несете ответственность за сохранение конфиденциальности своей учетной записи и пароля. Вы соглашаетесь принять ответственность за все действия, которые происходят под вашей учетной записью.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Интеллектуальная собственность</h2>
              <p>Все содержимое, доступное на нашем сайте, включая, но не ограничиваясь текстом, графикой, логотипами, иконками, изображениями, аудио клипами, цифровыми загрузками и программным обеспечением, является собственностью rplus или наших поставщиков контента и защищено законами об интеллектуальной собственности.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Ограничение ответственности</h2>
              <p>rplus не несет ответственности за любые прямые, непрямые, случайные, особые или косвенные убытки, возникшие в результате использования или невозможности использования наших услуг.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Применимое право</h2>
              <p>Настоящие Условия использования регулируются и толкуются в соответствии с законами Российской Федерации, без учета коллизионных норм права.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Контактная информация</h2>
              <p>Если у вас есть какие-либо вопросы относительно настоящих Условий использования, пожалуйста, свяжитесь с нами по адресу: info@rpluslb.ru</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
