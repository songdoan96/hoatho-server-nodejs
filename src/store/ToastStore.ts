import {create} from 'zustand';

interface ToastState {
  show: boolean;
  message: string;
  showToast: () => void;
  hideToast: () => void;
  setMessageToast: (msg: string) => void;
}

const useToastStore = create<ToastState>()(set => ({
  show: false,
  message: '',
  showToast: () => set({show: true}),
  hideToast: () => set({show: false}),
  setMessageToast: msg => set({message: msg, show: true}),
}));
export default useToastStore;
