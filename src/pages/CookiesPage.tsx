
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/authUtils';

const CookiesPage = () => {
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
          <h1 className="text-4xl font-bold mb-8">Политика cookies</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Последнее обновление: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Что такое cookies?</h2>
              <p>Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или мобильном телефоне) при посещении нашего сайта. Они помогают нам распознавать ваше устройство при последующих посещениях и улучшать ваш опыт использования сайта.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Какие cookies мы используем?</h2>
              <p>Мы используем следующие типы cookies:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Необходимые cookies:</strong> Эти cookies необходимы для функционирования нашего сайта и не могут быть отключены. Они обычно устанавливаются только в ответ на ваши действия, такие как установка настроек конфиденциальности, вход в систему или заполнение форм.</li>
                <li><strong>Аналитические cookies:</strong> Эти cookies помогают нам понимать, как посетители взаимодействуют с нашим сайтом, собирая и сообщая информацию анонимно. Они помогают нам улучшать наш сайт.</li>
                <li><strong>Функциональные cookies:</strong> Эти cookies позволяют нашему сайту запоминать выборы, которые вы сделали, и предоставлять улучшенные, более персонализированные функции.</li>
                <li><strong>Целевые cookies:</strong> Эти cookies могут быть установлены через наш сайт нашими рекламными партнерами. Они могут использоваться этими компаниями для создания профиля ваших интересов и показа релевантной рекламы на других сайтах.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Как управлять cookies?</h2>
              <p>Большинство веб-браузеров позволяют контролировать cookies через настройки. Вы можете отказаться от cookies, изменив настройки вашего браузера, но это может повлиять на функциональность нашего сайта.</p>
              <p className="mt-2">Инструкции по управлению cookies в различных браузерах:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie и другие данные сайтов</li>
                <li>Firefox: Настройки → Приватность и защита → Cookies и данные сайтов</li>
                <li>Safari: Настройки → Конфиденциальность → Cookies и данные сайтов</li>
                <li>Edge: Настройки → Конфиденциальность, поиск и службы → Cookies</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Сторонние cookies</h2>
              <p>Некоторые страницы нашего сайта могут содержать контент от сторонних сервисов, таких как YouTube, Facebook или Twitter. Обратите внимание, что мы не можем контролировать cookies, которые эти сайты используют. Вам следует ознакомиться с их политикой конфиденциальности для получения дополнительной информации.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Изменения в политике cookies</h2>
              <p>Мы можем обновлять нашу Политику cookies время от времени. Изменения вступают в силу сразу после публикации обновленной политики на этой странице.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Контактная информация</h2>
              <p>Если у вас есть какие-либо вопросы относительно нашей Политики cookies, пожалуйста, свяжитесь с нами по адресу: info@rplus.com</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPage;
