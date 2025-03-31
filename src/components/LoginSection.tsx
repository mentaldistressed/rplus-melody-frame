
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// Define form validation schema
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Имя пользователя должно содержать не менее 3 символов.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
});

interface LoginSectionProps {
  isActive: boolean;
}

const LoginSection = ({ isActive }: LoginSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      console.log('Login attempt with:', values);
      // Here you would typically connect to your backend/database
      // For now we just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login successful');
      form.reset();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className={cn(
        "absolute inset-0 w-full min-h-screen pt-32 opacity-0 pointer-events-none transition-opacity duration-500",
        isActive && "opacity-100 pointer-events-auto"
      )}
    >
      <div className="max-w-md mx-auto px-6 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Вход</h1>
        <p className="text-muted-foreground mb-8 animate-fade-in animate-delay-100">
          Войдите в свою учетную запись rplus
        </p>
        
        <div className="border rounded-lg p-6 mb-8 animate-fade-in animate-delay-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Введите имя пользователя" 
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
                      <Input 
                        type="password" 
                        placeholder="Введите пароль" 
                        {...field}
                        disabled={isLoading}
                      />
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
          <a href="#" className="text-primary underline-offset-4 hover:underline">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </section>
  );
};

export default LoginSection;
