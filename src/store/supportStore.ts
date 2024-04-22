import {create} from 'zustand';
interface AuthState {
  list: [];
  setList: (list: any) => void;
}

const useSupportStore = create<AuthState>()(set => ({
  list: [],
  setList: list => set({list: list}),
}));
export default useSupportStore;
