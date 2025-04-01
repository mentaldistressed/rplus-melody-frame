
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Аутентификация пользователя через Supabase
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (userError) throw userError;
      
      return {
        id: userData.id,
        username: userData.username,
        createdAt: userData.created_at
      };
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
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
      return {
        id: data.user.id,
        username: email.split('@')[0],
        createdAt: new Date().toISOString()
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
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
      
      return {
        id: userData.id,
        username: userData.username,
        createdAt: userData.created_at
      };
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
  }
};

// React хук для работы с авторизацией
export const useAuth = () => {
  const { toast } = useToast();
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await authenticateUser(email, password);
      
      if (user) {
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать, ${user.username}!`
        });
        return true;
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
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
      const user = await createUser(email, password);
      
      if (user) {
        toast({
          title: "Регистрация успешна",
          description: "Вы можете войти в свой аккаунт"
        });
        return true;
      } else {
        toast({
          title: "Ошибка регистрации",
          description: "Пользователь с таким email уже существует",
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
    const user = await getCurrentUser();
    return !!user;
  };
  
  const getUser = async (): Promise<User | null> => {
    return await getCurrentUser();
  };
  
  return { login, register, logout, isAuthenticated, getUser };
};
