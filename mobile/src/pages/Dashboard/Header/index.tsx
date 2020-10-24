import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../../hooks/auth';

import {
  Container,
  UserContainer,
  UserName,
  LogoutButton,
  UserAvatar,
  InputContainer,
  Input,
} from './styles';

const Header = (): JSX.Element => {
  const { user, logout } = useAuth();

  const fistName = useMemo(() => user.name.split(' ')[0], [user.name]);

  return (
    <Container>
      <UserContainer>
        <UserName>Olá, {fistName}</UserName>
        <LogoutButton onPress={logout}>
          <UserAvatar source={{ uri: user.avatar_url || undefined }} />
        </LogoutButton>
      </UserContainer>
      <InputContainer>
        <Icon name="search" size={18} color="#999" />
        <Input
          autoCapitalize="words"
          placeholder="Procurar..."
          returnKeyType="search"
          placeholderTextColor="#aaa"
        />
      </InputContainer>
    </Container>
  );
};

export default Header;
