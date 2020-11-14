import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: User) => Promise<void>;
};

type AuthState = {
  token: string;
  user: User;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Encontree:token', '@Encontree:user']);
    setData({} as AuthState);
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Encontree:token',
        '@Encontree:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;
        await api.get('sessions/validate').catch(logout);

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    loadData();
  }, [logout]);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post('sessions', { email, password });
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Encontree:token', token],
      ['@Encontree:user', JSON.stringify(user)],
    ]);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(async (user: User) => {
    await AsyncStorage.setItem('@Encontree:user', JSON.stringify(user));

    setData(oldState => ({ ...oldState, user }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, updateUser, user: data.user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
