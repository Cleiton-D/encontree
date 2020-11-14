import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import {
  Container,
  Content,
  PageTitle,
  ChatList,
  ChatItem,
  ClientAvatar,
  ClientName,
  ArrowLeft,
  EmptyConversationsText,
} from './styles';

export type Conversation = {
  id: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

const Conversations = (): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const history = useHistory();

  const handleNavigate = useCallback(
    (id: string) => {
      history.push(`/chat/${id}`);
    },
    [history],
  );

  useEffect(() => {
    async function loadConversations(): Promise<void> {
      const response = await api.get('conversations');
      setConversations(response.data);
    }
    loadConversations();
  }, []);

  return (
    <Container>
      <PageTitle>Conversas</PageTitle>
      <Content>
        {conversations.length > 0 ? (
          <ChatList>
            {conversations.map(conversation => (
              <ChatItem
                key={conversation.id}
                onClick={() => handleNavigate(conversation.user.id)}
              >
                <ClientAvatar avatarUrl={conversation.user.avatar_url} />
                <ClientName>{conversation.user.name}</ClientName>
                <ArrowLeft />
              </ChatItem>
            ))}
          </ChatList>
        ) : (
          <EmptyConversationsText>
            Você ainda não tem nenhuma conversa :(
          </EmptyConversationsText>
        )}
      </Content>
    </Container>
  );
};

export default Conversations;
