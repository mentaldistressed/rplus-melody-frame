
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface UserData {
  id: string;
  username: string;
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users from Supabase
      const { data, error } = await supabase
        .from('users')
        .select('id, username, created_at');
        
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Ошибка при загрузке пользователей",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditUser = (user: UserData) => {
    setEditUser(user);
    setEditUsername(user.username);
    setDialogOpen(true);
  };
  
  const handleSaveUser = async () => {
    if (!editUser) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ username: editUsername })
        .eq('id', editUser.id);
        
      if (error) throw error;
      
      toast({
        title: "Данные сохранены",
        description: "Информация пользователя успешно обновлена"
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === editUser.id 
          ? { ...user, username: editUsername } 
          : user
      ));
      
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Ошибка при сохранении",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Управление пользователями</h2>
        <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading}>
          {loading ? "Загрузка..." : "Обновить"}
        </Button>
      </div>
      
      {loading ? (
        <div className="py-10 text-center text-gray-500">Загрузка пользователей...</div>
      ) : users.length === 0 ? (
        <div className="py-10 text-center text-gray-500">Пользователей не найдено</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Имя пользователя
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button 
                      onClick={() => handleEditUser(user)} 
                      variant="ghost" 
                      size="sm"
                    >
                      Редактировать
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование пользователя</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Имя пользователя
              </label>
              <Input
                id="username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveUser}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
