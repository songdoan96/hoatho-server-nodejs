import {create} from 'zustand';

interface User {
  _id: string;
  birthday: Date;
  fcmToken: string;
  name: string;
  password: string;
  staff_id: string;
  address?: string;
  phone: string;
}

interface AuthState {
  auth: User | null;
  authLogin: (user: any) => void;
}

const useAuthStore = create<AuthState>()(set => ({
  auth: null,
  authLogin: user => set({auth: user}),
  authLogout: () => set({auth: null}),
}));
export default useAuthStore;
