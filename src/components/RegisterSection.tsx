
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/authUtils';
import { Eye, EyeOff } from 'lucide-react';
import { useRegistrationStore } from '@/utils/registrationUtils';
import { useToast } from '@/hooks/use-toast';

// Define form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

interface RegisterSectionProps {
  isActive: boolean;
  onSectionChange: (section: string) => void;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({ isActive, onSectionChange }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const isRegistrationEnabled = useRegistrationStore((state) => state.isRegistrationEnabled);

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isRegistrationEnabled) {
      toast({
        title: "Регистрация отключена",
        description: "В данный момент регистрация новых пользователей отключена. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await register(values.email, values.password);
      
      if (success) {
        form.reset();
        // Redirect to login page after successful registration
        onSectionChange('login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSectionChange('login');
  };

  const handleRegisterLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isRegistrationEnabled) {
      toast({
        title: "Регистрация отключена",
        description: "В данный момент регистрация новых пользователей отключена. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <section 
      className={cn(
        "fixed inset-0 w-full min-h-screen pt-32 transition-all duration-500 transform",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
    >
      <div className="max-w-md mx-auto px-6 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Регистрация</h1>
        <p className="text-muted-foreground mb-8 animate-fade-in animate-delay-100">
          Создайте новую учетную запись rplus
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
                        disabled={isLoading || !isRegistrationEnabled} 
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
                          disabled={isLoading || !isRegistrationEnabled}
                          className="pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтверждение пароля</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Повторите пароль" 
                          {...field}
                          disabled={isLoading || !isRegistrationEnabled}
                          className="pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                disabled={isLoading || !isRegistrationEnabled}
              >
                {isLoading ? "Создание аккаунта..." : "Зарегистрироваться"}
              </Button>
            </form>
          </Form>
        </div>
        
        <p className="text-center text-sm text-muted-foreground animate-fade-in animate-delay-300">
          У вас уже есть аккаунт?{" "}
          <a 
            href="#" 
            className="text-primary underline-offset-4 hover:underline"
            onClick={handleLoginClick}
          >
            Войти
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegisterSection;
