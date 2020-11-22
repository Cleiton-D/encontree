import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  ConversationList,
  ConversationItem,
  ProviderInfo,
  ProviderImage,
  ProviderName,
  EndContainerIcon,
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

  const navigation = useNavigation();

  const handleNavigate = useCallback(
    (userId: string) => {
      navigation.navigate('Chat', { userId });
    },
    [navigation],
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
      <ConversationList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ConversationItem onPress={() => handleNavigate(item.user.id)}>
            <ProviderInfo>
              <ProviderImage
                source={{ uri: item.user.avatar_url || undefined }}
              />
              <ProviderName numberOfLines={1} ellipsizeMode="tail">
                {item.user.name}
              </ProviderName>
            </ProviderInfo>
            <EndContainerIcon name="chevron-right" size={24} color="#aaa" />
          </ConversationItem>
        )}
      />
    </Container>
  );
};

export default Conversations;
