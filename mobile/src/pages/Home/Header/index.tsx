import React, { useMemo, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { debounce } from 'lodash';

import { useAuth } from '../../../hooks/auth';

import {
  Container,
  UserContainer,
  UserName,
  UserAvatar,
  InputContainer,
  Input,
} from './styles';

type DashboardHeaderProps = {
  onSearch: (value: string) => void;
};

const Header = ({ onSearch }: DashboardHeaderProps): JSX.Element => {
  const { user } = useAuth();
  const fistName = useMemo(() => user.name.split(' ')[0], [user.name]);

  const handleSearch = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch],
  );

  const handleSearchDelayed = useMemo(() => debounce(handleSearch, 1000), [
    handleSearch,
  ]);

  return (
    <Container>
      <UserContainer>
        <UserName>Olá, {fistName}</UserName>
        <UserAvatar source={{ uri: user.avatar_url || undefined }} />
      </UserContainer>
      <InputContainer>
        <Icon name="search" size={18} color="#999" />
        <Input
          autoCapitalize="words"
          placeholder="Procurar..."
          returnKeyType="search"
          placeholderTextColor="#aaa"
          onChangeText={handleSearchDelayed}
        />
      </InputContainer>
    </Container>
  );
};

export default Header;
