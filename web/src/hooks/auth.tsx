import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  username: string;
  email: string;
};

type AuthState = {
  token: string;
  user: User;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@EncontreeWeb:authToken');
    const user = localStorage.getItem('@EncontreeWeb:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@EncontreeWeb:authToken', token);
    localStorage.setItem('@EncontreeWeb:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@EncontreeWeb:authToken');
    localStorage.removeItem('@EncontreeWeb:user');

    api.defaults.headers.authorization = undefined;
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
