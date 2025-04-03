
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/authUtils';
import { Eye, EyeOff } from 'lucide-react';

// Define form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
});

interface LoginSectionProps {
  isActive: boolean;
  onSectionChange: (section: string) => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ isActive, onSectionChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const { login, isAuthenticated, logout, getUser } = useAuth();

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
      
      if (authenticated) {
        const user = await getUser();
        setCurrentUser(user);
      }
    };
    
    checkAuth();
  }, [isAuthenticated, getUser]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        form.reset();
        // Обновляем состояние аутентификации
        setIsUserAuthenticated(true);
        const user = await getUser();
        setCurrentUser(user);
        // Redirect to home page after successful login
        onSectionChange('home');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogout = async () => {
    await logout();
    setIsUserAuthenticated(false);
    setCurrentUser(null);
  };

  // If user is already authenticated, show profile info instead of login form
  if (isUserAuthenticated && currentUser) {
    return (
      <section 
        className={cn(
          "fixed inset-0 w-full min-h-screen pt-32 transition-all duration-500 transform",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
        )}
      >
        <div className="max-w-md mx-auto px-6 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Профиль</h1>
          <p className="text-muted-foreground mb-8 animate-fade-in animate-delay-100">
            Вы вошли в систему
          </p>
          
          <div className="border rounded-lg p-6 mb-8 animate-fade-in animate-delay-200">
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Имя пользователя</p>
                <p className="font-medium">{currentUser.username}</p>
              </div>
              
              <Button 
                onClick={handleLogout}
                variant="outline"
              >
                Выйти из аккаунта
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={cn(
        "fixed inset-0 w-full min-h-screen pt-32 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="max-w-md mx-auto px-6 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Вход</h1>
        <p className="text-muted-foreground mb-8 animate-fade-in animate-delay-100">
          Введите свои данные для входа в учётную запись
        </p>
        
        <div className="border rounded-lg p-6 mb-8 animate-fade-in animate-delay-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Введите ваш email" 
                        type="email"
                        {...field} 
                        disabled={isLoading} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Введите пароль" 
                          {...field}
                          disabled={isLoading}
                          className="pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={toggleShowPassword}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Выполняется вход..." : "Войти"}
              </Button>
            </form>
          </Form>
        </div>
        
        <p className="text-center text-sm text-muted-foreground animate-fade-in animate-delay-300">
          У вас нет учетной записи?{" "}
          <a 
            href="#" 
            className="text-primary underline-offset-4 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('register');
            }}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </section>
  );
};

export default LoginSection;
