
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Аутентификация пользователя через Supabase
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    // Вход с помощью email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Получение данных пользователя из таблицы users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (userError) throw userError;
      
      if (userData) {
        return {
          id: userData.id,
          username: userData.username,
          createdAt: userData.created_at
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// Создание нового пользователя
export const createUser = async (email: string, password: string): Promise<User | null> => {
  try {
    // Регистрация пользователя в системе аутентификации Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: email.split('@')[0], // Используем часть email как username по умолчанию
        }
      }
    });

    if (error) throw error;
    
    if (data.user) {
      // Пользователь будет создан в таблице users автоматически через триггер
      // Но нам нужно убедиться, что данные доступны, дожидаемся создания записи
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (userError) {
        // Если запись еще не создана триггером, создаем временную запись для возврата
        return {
          id: data.user.id,
          username: email.split('@')[0],
          createdAt: new Date().toISOString()
        };
      }
      
      if (userData) {
        return {
          id: userData.id,
          username: userData.username,
          createdAt: userData.created_at
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Получение текущего аутентифицированного пользователя
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (data.session?.user) {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
        
      if (error) throw error;
      
      if (userData) {
        return {
          id: userData.id,
          username: userData.username,
          createdAt: userData.created_at
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Выход из аккаунта
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// React хук для работы с авторизацией
export const useAuth = () => {
  const { toast } = useToast();
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Используем signInWithPassword напрямую для более ясной обработки ошибок
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Ошибка входа",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      if (data.user) {
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать!`
        });
        return true;
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неизвестная ошибка при входе",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: email.split('@')[0]
          }
        }
      });
      
      if (error) {
        toast({
          title: "Ошибка регистрации",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      if (data.user) {
        toast({
          title: "Регистрация успешна",
          description: "Проверьте вашу почту для подтверждения email"
        });
        return true;
      } else {
        toast({
          title: "Ошибка регистрации",
          description: "Неизвестная ошибка при регистрации",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const logout = async (): Promise<void> => {
    await logoutUser();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из своего аккаунта"
    });
  };
  
  const isAuthenticated = async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  };
  
  const getUser = async (): Promise<User | null> => {
    return await getCurrentUser();
  };
  
  return { login, register, logout, isAuthenticated, getUser };
};
