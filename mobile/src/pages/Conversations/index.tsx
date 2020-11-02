import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  ConversationList,
  ConversationItem,
  ProviderImage,
  ProviderName,
  EndContainerIcon,
} from './styles';

export type User = {
  id: string;
  name: string;
  avatar_url: string;
};

type Schedule = {
  id: string;
  provider: {
    user: User;
  };
  date: Date;
};

const Conversations = (): JSX.Element => {
  const [conversations, setConversations] = useState<User[]>([]);

  const navigation = useNavigation();

  const handleNavigate = useCallback(
    (userId: string) => {
      navigation.navigate('Chat', { userId });
    },
    [navigation],
  );

  useEffect(() => {
    async function loadSchedules(): Promise<void> {
      const response = await api.get<Schedule[]>('schedules/me');

      const filteredUsers = response.data.reduce<User[]>(
        (accumulator, schedule) => {
          const itemExists = accumulator.find(
            user => user.id === schedule.provider.user.id,
          );
          if (!itemExists) {
            accumulator.push(schedule.provider.user);
          }

          return accumulator;
        },
        [],
      );

      setConversations(filteredUsers);
    }
    loadSchedules();
  }, []);

  return (
    <Container>
      <ConversationList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ConversationItem onPress={() => handleNavigate(item.id)}>
            <ProviderImage source={{ uri: item.avatar_url || undefined }} />
            <ProviderName>{item.name}</ProviderName>
            <EndContainerIcon name="chevron-right" size={24} color="#aaa" />
          </ConversationItem>
        )}
      />
    </Container>
  );
};

export default Conversations;
