
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/authUtils';

const PrivacyPolicyPage = () => {
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
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <div className="prose max-w-none">
            {/* <p className="mb-4">Последнее обновление: {new Date().toLocaleDateString()}</p> */}
            <p className="mb-4">Последнее обновление: 02.04.2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Введение</h2>
              <p>Добро пожаловать на сайт музыкального лейбла rplus. Ваша конфиденциальность очень важна для нас. Настоящая Политика конфиденциальности объясняет, какую информацию мы собираем, как мы ее используем и защищаем.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Собираемая информация</h2>
              <p>Мы можем собирать следующую информацию:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Персональные данные, такие как имя, адрес электронной почты и информация профиля.</li>
                <li>Данные об использовании нашего сайта и взаимодействии с ним.</li>
                <li>Информация, которую вы предоставляете при регистрации на нашем сайте.</li>
                <li>Информация о вашем устройстве и соединении с интернетом.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Использование информации</h2>
              <p>Собранная информация может использоваться для:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Предоставления и улучшения наших услуг.</li>
                <li>Обработки транзакций и управления аккаунтом.</li>
                <li>Отправки информационных сообщений и обновлений.</li>
                <li>Персонализации вашего опыта на нашем сайте.</li>
                <li>Анализа тенденций использования и улучшения функциональности сайта.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Защита данных</h2>
              <p>Мы принимаем соответствующие меры для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Эти меры включают внутренние проверки наших процессов сбора, хранения и обработки данных, а также меры безопасности для защиты от несанкционированного доступа.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Раскрытие информации</h2>
              <p>Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, когда это необходимо для предоставления запрошенной вами услуги или требуется по закону.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Ваши права</h2>
              <p>У вас есть право:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Получать доступ к своим персональным данным.</li>
                <li>Исправлять неточные или неполные данные.</li>
                <li>Запрашивать удаление ваших данных.</li>
                <li>Отозвать свое согласие на обработку данных.</li>
                <li>Подать жалобу в надзорный орган.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Изменения в политике конфиденциальности</h2>
              <p>Мы можем обновлять нашу Политику конфиденциальности время от времени. Мы будем уведомлять вас о любых изменениях, публикуя новую версию на этой странице.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Контактная информация</h2>
              <p>Если у вас есть вопросы относительно настоящей Политики конфиденциальности, свяжитесь с нами по адресу: info@rpluslb.ru</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
