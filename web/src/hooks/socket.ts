import { useState, useEffect, useCallback } from 'react';
import SocketIO from 'socket.io-client';

type UseSocketProps = {
  sendMessage: (targetId: string, message: string) => void;
  onReceive: <T>(channel: string, fn: (data: T) => void) => void;
};

export function useSocket(): UseSocketProps {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  const sendMessage = useCallback(
    (userId: string, message: string) => {
      if (socket) {
        socket.emit('message', { userId, message });
      }
    },
    [socket],
  );

  const onReceive = useCallback(
    <T>(channel: string, fn: (data: T) => void) => {
      if (socket) {
        socket.on(channel, fn);
      }
    },
    [socket],
  );

  useEffect(() => {
    const token = localStorage.getItem('@EncontreeWeb:authToken');

    const io = SocketIO('http://127.0.0.1:3333', { query: { token } });
    setSocket(io);

    return () => {
      io.disconnect();
    };
  }, []);

  return { sendMessage, onReceive };
}
