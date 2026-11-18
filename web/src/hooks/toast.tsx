import React, { createContext, useCallback, useContext, useState } from 'react';
import * as uuid from 'uuid';

import { Message, Container } from '../components/Toast';

type ToastContextData = {
  addToast: (message: Omit<Message, 'id'>) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext({} as ToastContextData);

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addToast = useCallback(
    ({ type, title, description, time }: Omit<Message, 'id'>) => {
      const item = {
        id: uuid.v4(),
        type,
        title,
        description,
        time,
      };

      setMessages(oldState => [...oldState, item]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldState => oldState.filter(item => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Container>{messages}</Container>
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  return context;
}

export { ToastProvider, useToast };
