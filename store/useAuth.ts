import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loadProfile: () => Promise<void>;
  logout: () => void;


    isLoading: boolean;
   checkAuth: () => Promise<void>;
}




export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
   isLoading: true,

  login: async (email, password) => {
    try {
      const res = await axios.post('https://login-register-profile.onrender.com/api/auth/login', {
        email,
        password,
      });
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      set({ token, user });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  loadProfile: async () => {

    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('https://login-register-profile.onrender.com/api/profile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.user, token });
    } catch (error) {
      console.error('Profile load error:', error);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ user: null, token: null });
  },



  checkAuth: async () => {
    const token = await AsyncStorage.getItem('token');
    set({ token, isLoading: false });
  },

}));
