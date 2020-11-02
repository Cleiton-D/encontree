import React, { useState, useEffect, useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import uuid from 'react-native-uuid';

import { StackParamList } from '../../routes/app.routes';

import { useSocket } from '../../hooks/socket';

import Header from '../../components/Header';
import ChatHeader from './Header';

import {
  Container,
  MessagesList,
  MessageItem,
  MessageArrow,
  MessageText,
  MessageTime,
  InputContainer,
  MessageInput,
  SendMessageButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

type ScheduleCreatedProp = RouteProp<StackParamList, 'Chat'>;

export type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;

  formattedTime: string;
  me: boolean;
};

const Chat = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageListRef = useRef<FlatList>(null);

  const inputValueRef = useRef<{ value: string }>({ value: '' });

  const { params } = useRoute<ScheduleCreatedProp>();
  const { user } = useAuth();

  const { sendMessage, onReceive } = useSocket();

  const handleReceiveMessage = useCallback(
    (data: Message) => {
      setMessages(oldState => [
        ...oldState,
        {
          ...data,
          formattedTime: format(parseISO(data.created_at), 'HH:mm'),
          me: data.sender_id === user.id,
        },
      ]);
    },
    [user.id],
  );

  const handleSendMessage = useCallback(() => {
    const message = inputValueRef.current.value;
    sendMessage(params.userId, message);

    setMessages(oldMessages => [
      ...oldMessages,
      {
        content: message,
        created_at: new Date().toISOString(),
        id: uuid.v4(),
        sender_id: user.id,
        formattedTime: format(new Date(), 'HH:mm'),
        me: true,
      },
    ]);
  }, [sendMessage, params, user.id]);

  const scrollToEnd = useCallback(() => {
    messageListRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    onReceive(user.id, handleReceiveMessage);
  }, [user, onReceive, handleReceiveMessage]);

  useEffect(() => {
    async function loadOldMessages(): Promise<void> {
      const response = await api.get<Message[]>('messages', {
        params: { recipient: params.userId },
      });

      const oldMessages = response.data.map(message => ({
        ...message,
        formattedTime: format(parseISO(message.created_at), 'HH:mm'),
        me: message.sender_id === user.id,
      }));

      setMessages(oldMessages);
    }
    loadOldMessages();
  }, [params.userId, user.id]);

  return (
    <>
      <Header>
        <ChatHeader userId={params.userId} />
      </Header>
      <Container>
        <MessagesList
          ref={messageListRef}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageItem itsMe={item.me}>
              <MessageArrow itsMe={item.me} />
              <MessageText itsMe={item.me}>{item.content}</MessageText>
              <MessageTime itsMe={item.me}>{item.formattedTime}</MessageTime>
            </MessageItem>
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={125}
        >
          <InputContainer>
            <MessageInput
              placeholder="Digite uma mensagem"
              placeholderTextColor="#999"
              onChangeText={value => {
                inputValueRef.current.value = value;
              }}
            />
            <SendMessageButton onPress={handleSendMessage}>
              <Icon name="send" size={20} color="#fff" />
            </SendMessageButton>
          </InputContainer>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default Chat;
