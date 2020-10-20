import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  username: string;
  email: string;
};

type Provider = {
  id: string;
  category_id: string;
  description: string;
};

type AuthState = {
  token: string;
  user: User;
  provider: Provider;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  provider: Provider;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (data: User) => void;
  updateProvider: (data: Provider) => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@EncontreeWeb:authToken');
    const user = localStorage.getItem('@EncontreeWeb:user');
    const provider = localStorage.getItem('@EncontreeWeb:provider');

    if (token && user && provider) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
        provider: JSON.parse(provider),
      };
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

    const providerResponse = await api.get('/providers/show');
    const provider = providerResponse.data;

    localStorage.setItem('@EncontreeWeb:provider', JSON.stringify(provider));

    setData({ token, user, provider });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@EncontreeWeb:authToken');
    localStorage.removeItem('@EncontreeWeb:user');
    localStorage.removeItem('@EncontreeWeb:provider');

    api.defaults.headers.authorization = undefined;
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@EncontreeWeb:user', JSON.stringify(user));

    setData(oldData => ({ ...oldData, user }));
  }, []);

  const updateProvider = useCallback((provider: Provider) => {
    localStorage.setItem('@EncontreeWeb:provider', JSON.stringify(provider));

    setData(oldData => ({ ...oldData, provider }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        provider: data.provider,
        login,
        logout,
        updateUser,
        updateProvider,
      }}
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
