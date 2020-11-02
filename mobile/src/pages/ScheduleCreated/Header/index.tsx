import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../../services/api';

import {
  Container,
  BackButton,
  ProviderContainer,
  UserImage,
  UserInfo,
  UserName,
  UserNickname,
  ProviderDescription,
} from './styles';

type HeaderProps = {
  providerId: string;
};

type Provider = {
  id: string;
  description: string;
  user: {
    name: string;
    username: string;
    avatar_url: string;
  };
};

const Header = ({ providerId }: HeaderProps): JSX.Element => {
  const [provider, setProvider] = useState<Provider | null>();

  const navigation = useNavigation();

  useEffect(() => {
    async function loadProvider(): Promise<void> {
      const response = await api.get(`providers/show/${providerId}`);
      setProvider(response.data);
    }
    loadProvider();
  }, [providerId]);

  return (
    <SafeAreaView>
      <Container>
        <BackButton onPress={navigation.goBack}>
          <Icon name="chevron-left" size={24} />
        </BackButton>
        <ProviderContainer>
          <UserImage source={{ uri: provider?.user.avatar_url || undefined }} />
          <UserInfo>
            <UserName>{provider?.user.name}</UserName>
            <UserNickname>@{provider?.user.username}</UserNickname>
          </UserInfo>
        </ProviderContainer>
        <ProviderDescription numberOfLines={4} ellipsizeMode="tail">
          {provider?.description}
        </ProviderDescription>
      </Container>
    </SafeAreaView>
  );
};

export default Header;
