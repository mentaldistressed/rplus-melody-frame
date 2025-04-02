
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegistrationState {
  isRegistrationEnabled: boolean;
  toggleRegistration: () => void;
  enableRegistration: () => void;
  disableRegistration: () => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      isRegistrationEnabled: true,
      toggleRegistration: () => set((state) => ({ isRegistrationEnabled: !state.isRegistrationEnabled })),
      enableRegistration: () => set({ isRegistrationEnabled: true }),
      disableRegistration: () => set({ isRegistrationEnabled: false }),
    }),
    {
      name: 'registration-settings',
    }
  )
);

export const isRegistrationAllowed = (): boolean => {
  return useRegistrationStore.getState().isRegistrationEnabled;
};
