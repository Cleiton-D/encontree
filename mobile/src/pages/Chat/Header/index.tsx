import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../services/api';

import {
  Container,
  ProviderContainer,
  ProviderImage,
  ProviderName,
  ProviderNickname,
} from './styles';

type HeaderProps = {
  userId: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
};

const Header = ({ userId }: HeaderProps): JSX.Element => {
  const [user, setUser] = useState<User>();

  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const response = await api.get(`users/${userId}`);
      setUser(response.data);
    }
    loadUser();
  }, [userId]);

  return (
    <SafeAreaView>
      <Container>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-left" size={24} />
        </TouchableOpacity>

        <ProviderContainer>
          <ProviderImage source={{ uri: user?.avatar_url || undefined }} />
          <ProviderName>{user?.name}</ProviderName>
          <ProviderNickname>@{user?.username}</ProviderNickname>
        </ProviderContainer>

        <TouchableOpacity>
          <Icon name="info" size={24} />
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

export default Header;
