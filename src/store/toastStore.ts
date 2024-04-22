import {create} from 'zustand';

interface ToastState {
  show: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>()(set => ({
  show: false,
  message: '',
  type: 'default',
  showToast: msg => set({show: true, message: msg}),
  hideToast: () => set({show: false, message: ''}),
}));
export default useToastStore;
