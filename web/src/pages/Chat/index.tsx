import React from 'react';
import { MdSend } from 'react-icons/md';
import { useAuth } from '../../hooks/auth';

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

const Chat = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <PageTitle>Conversa</PageTitle>
      <Content>
        <ChatContainer>
          <MessageList>
            <Message time="12:00">Olá Cleiton, bom dia</Message>
            <Message itsMe time="12:01">
              Olá, bom dia
            </Message>
            <Message time="12:03">
              Lorem Ipsum gfagnlrbg avgfd bfdba gvar gvafs dbgvafkljbgv afba dfb
              adgjvnrb bhr
            </Message>
            <Message itsMe time="12:03">
              Lorem Ipsum dolor femdlkv vsdf bvafs vgsf bvfs bvf vafsbdf fb fdab
              afbdf bfadbadf dfabvfdb bfdb fbadfb fb fbf dgb b fg vf b db dsf bv
              sdfb dfs b dfsb sdfb sd fgbfd sb dgsfb bndsf b
            </Message>
          </MessageList>
          <MessageInputContainer>
            <MessageInput type="text" placeholder="Digite uma mensagem" />
            <SendMessageButton>
              <MdSend size={26} color="#fff" />
            </SendMessageButton>
          </MessageInputContainer>
        </ChatContainer>
        <UserInfoContent>
          <UserAvatar avatarUrl={user.avatar_url} />
          <UserInfo>
            <Username>Cleiton Dione Ahnerth Kiper</Username>
            <Usernick>cleitonkiper</Usernick>
            <ServiceDescription>Limpeza de quintal</ServiceDescription>
            <Separator />
            <ScheduleDate>
              <strong>Data:</strong>
              <span>23/11/2020</span>
            </ScheduleDate>
            <ScheduleDate>
              <strong>Horário:</strong>
              <span>13:00</span>
            </ScheduleDate>
          </UserInfo>
        </UserInfoContent>
      </Content>
    </Container>
  );
};

export default Chat;
