
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

// Ключ для хранения пользователей в localStorage
const USERS_STORAGE_KEY = 'rplus_users';
const CURRENT_USER_KEY = 'rplus_current_user';

// Получение списка всех пользователей из localStorage
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Добавление нового пользователя
export const createUser = (username: string, password: string): User | null => {
  const users = getUsers();
  
  // Проверяем, существует ли пользователь с таким именем
  if (users.some(user => user.username === username)) {
    return null;
  }

  // Создаем нового пользователя
  const newUser: User = {
    id: generateId(),
    username,
    password, // В реальном приложении пароли нужно хранить в хешированном виде
    createdAt: new Date().toISOString()
  };

  // Добавляем пользователя в список и сохраняем в localStorage
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return newUser;
};

// Аутентификация пользователя
export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Сохраняем текущего пользователя в localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
  
  return user;
};

// Получение текущего аутентифицированного пользователя
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Выход из аккаунта
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Генерация уникального ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// React хук для работы с авторизацией
export const useAuth = () => {
  const { toast } = useToast();
  
  const login = (username: string, password: string): boolean => {
    const user = authenticateUser(username, password);
    
    if (user) {
      toast({
        title: "Вход выполнен успешно",
        description: `Добро пожаловать, ${username}!`
      });
      return true;
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверное имя пользователя или пароль",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const register = (username: string, password: string): boolean => {
    const user = createUser(username, password);
    
    if (user) {
      toast({
        title: "Регистрация успешна",
        description: "Вы можете войти в свой аккаунт"
      });
      return true;
    } else {
      toast({
        title: "Ошибка регистрации",
        description: "Пользователь с таким именем уже существует",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const logout = (): void => {
    logoutUser();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из своего аккаунта"
    });
  };
  
  const isAuthenticated = (): boolean => {
    return !!getCurrentUser();
  };
  
  const getUser = (): User | null => {
    return getCurrentUser();
  };
  
  return { login, register, logout, isAuthenticated, getUser };
};
