import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
    let io: SocketIOClient.Socket;

    async function connectWebSocket(): Promise<void> {
      const token = await AsyncStorage.getItem('@Encontree:token');

      io = SocketIO('http://127.0.0.1:3333', { query: { token } });
      setSocket(io);
    }

    connectWebSocket();
    return () => {
      if (io) io.disconnect();
    };
  }, []);

  return { sendMessage, onReceive };
}
