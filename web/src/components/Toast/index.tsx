import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

export type Message = {
  key: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  time?: number;
};

type ToastProps = {
  message: Message;
  styles: Record<string, unknown>;
};

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  warning: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast = ({ message, styles }: ToastProps): JSX.Element => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.key);
    }, message.time || 3000);

    return () => clearTimeout(timer);
  }, [message.key, message.time, removeToast]);

  return (
    <Container type={message.type || 'info'} style={styles}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.key)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export { Container } from './Container';
export default Toast;
