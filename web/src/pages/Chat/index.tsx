import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MdSend } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { v4 } from 'uuid';

import { useAuth } from '../../hooks/auth';

import { useSocket } from '../../hooks/socket';
import api from '../../services/api';

import {
  Container,
  Content,
  PageTitle,
  ChatContainer,
  MessageList,
  Message,
  MessageInputContainer,
  MessageInput,
  SendMessageButton,
  UserInfoContent,
  UserAvatar,
  UserInfo,
  Username,
  Usernick,
  ServiceDescription,
  Separator,
  ScheduleDate,
} from './styles';

type Schedule = {
  date: string;
  hourFormatted: string;
  dateFormatted: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  formatedTime: string;
  me: boolean;
};

const Chat = (): JSX.Element => {
  const [lastSchedule, setLastSchedule] = useState<Schedule>();

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLLIElement>(null);

  const [user, setUser] = useState<User>();
  const { userId } = useParams<{ userId: string }>();

  const { user: authUser } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, onReceive } = useSocket();

  const handleSendMessage = useCallback(() => {
    if (inputRef.current) {
      const message = inputRef.current.value;

      sendMessage(userId, message);

      setMessages(oldMessages => [
        ...oldMessages,
        {
          content: message,
          id: v4(),
          sender_id: authUser.id,
          created_at: new Date().toISOString(),
          formatedTime: format(new Date(), 'HH:mm'),
          me: true,
        },
      ]);

      inputRef.current.value = '';

      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [sendMessage, userId, authUser.id]);

  const handleReceiveMessage = useCallback(
    (data: Message) => {
      setMessages(oldState => [
        ...oldState,
        {
          ...data,
          formatedTime: format(parseISO(data.created_at), 'HH:mm'),
          me: data.sender_id === authUser.id,
        },
      ]);

      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },

    [authUser.id],
  );

  useEffect(() => {
    async function loadLastSchedule(): Promise<void> {
      const response = await api.get<Schedule>('/schedules/me/last', {
        params: { user: userId },
      });

      const schedule = response.data;
      const date = parseISO(response.data.date);
      const dateFormatted = format(date, 'dd/MM/yyyy');
      const hourFormatted = format(date, 'HH:mm');

      setLastSchedule({ ...schedule, dateFormatted, hourFormatted });
    }
    loadLastSchedule();
  }, [userId]);

  useEffect(() => {
    async function loadOldMessages(): Promise<void> {
      const response = await api.get<Message[]>('messages', {
        params: { recipient: userId },
      });

      const oldMessages = response.data.map(message => ({
        ...message,
        formattedTime: format(parseISO(message.created_at), 'HH:mm'),
        me: message.sender_id === authUser.id,
      }));

      setMessages(oldMessages);
    }
    loadOldMessages();
  }, [authUser.id, userId]);

  useEffect(() => {
    onReceive(authUser.id, handleReceiveMessage);
  }, [onReceive, authUser.id, handleReceiveMessage]);

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const response = await api.get(`users/${userId}`);
      setUser(response.data);
    }
    loadUser();
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <Container>
      <PageTitle>Conversa</PageTitle>
      <Content>
        <ChatContainer>
          <MessageList>
            {messages.map(message => (
              <Message
                key={message.id}
                time={message.formatedTime}
                itsMe={message.sender_id === authUser.id}
              >
                {message.content}
              </Message>
            ))}
            <li style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
          </MessageList>
          <MessageInputContainer>
            <MessageInput
              type="text"
              placeholder="Digite uma mensagem"
              ref={inputRef}
            />
            <SendMessageButton onClick={handleSendMessage}>
              <MdSend size={26} color="#fff" />
            </SendMessageButton>
          </MessageInputContainer>
        </ChatContainer>

        <UserInfoContent>
          <UserAvatar avatarUrl={user?.avatar_url || ''} />
          <UserInfo>
            <Username>{user?.name}</Username>
            <Usernick>{user?.username}</Usernick>
            <ServiceDescription>Último agendamento</ServiceDescription>
            <Separator />
            <ScheduleDate>
              <strong>Data:</strong>
              <span>{lastSchedule?.dateFormatted}</span>
            </ScheduleDate>
            <ScheduleDate>
              <strong>Horário:</strong>
              <span>{lastSchedule?.hourFormatted}</span>
            </ScheduleDate>
          </UserInfo>
        </UserInfoContent>
      </Content>
    </Container>
  );
};

export default Chat;
