import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  PageTitle,
  ChatList,
  ChatItem,
  ClientAvatar,
  ClientName,
  ArrowLeft,
} from './styles';

const Conversations = (): JSX.Element => {
  const history = useHistory();

  const handleNavigate = useCallback(
    (id: string) => {
      history.push(`/chat/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <PageTitle>Conversas</PageTitle>
      <Content>
        <ChatList>
          <ChatItem onClick={() => handleNavigate('1')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
          <ChatItem onClick={() => handleNavigate('2')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
          <ChatItem onClick={() => handleNavigate('3')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
          <ChatItem onClick={() => handleNavigate('4')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
          <ChatItem onClick={() => handleNavigate('5')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
          <ChatItem onClick={() => handleNavigate('6')}>
            <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
            <ClientName>Cleiton Dione</ClientName>
            <ArrowLeft />
          </ChatItem>
        </ChatList>
      </Content>
    </Container>
  );
};

export default Conversations;
