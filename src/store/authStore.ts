import {create} from 'zustand';
interface AuthState {
  user: any;
  authLogin: (user: any) => void;
  authRestore: (user: any) => void;
  authLogout: () => void;
}

const useAuthStore = create<AuthState>()(set => ({
  user: null,
  authLogin: user => set({user}),
  authRestore: userStore => set({user: JSON.parse(userStore)}),
  authLogout: () => set({user: null}),
}));
export default useAuthStore;
