import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { StackParamList } from '../../routes/app.routes';

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

type ScheduleCreatedProp = RouteProp<StackParamList, 'Chat'>;

export type Message = {
  id: string;
  content: string;
  date: string;

  me: boolean;
};

const Chat = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello World', date: '11:30', me: false },
    {
      id: '2',
      content:
        'Hello World dfadsf vfdsav f dcv dsfc adsv adsv adsv afsdv afsv v sadfv afsv fdsv vddd ',
      date: '11:31',
      me: true,
    },
  ]);

  const { params } = useRoute<ScheduleCreatedProp>();

  const teste = useCallback(e => {
    console.log(e);
  }, []);

  return (
    <>
      <Header>
        <ChatHeader userId={params.userId} />
      </Header>
      <Container>
        <MessagesList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageItem itsMe={item.me}>
              <MessageArrow itsMe={item.me} />
              <MessageText itsMe={item.me}>{item.content}</MessageText>
              <MessageTime itsMe={item.me}>{item.date}</MessageTime>
            </MessageItem>
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={125}
        >
          <InputContainer onLayout={teste}>
            <MessageInput
              placeholder="Digite uma mensagem"
              placeholderTextColor="#999"
            />
            <SendMessageButton>
              <Icon name="send" size={20} color="#fff" />
            </SendMessageButton>
          </InputContainer>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default Chat;
