import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';

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

  const inputRef = useRef<TextInput>(null);

  const inputValueRef = useRef<{ value: string | undefined }>({
    value: undefined,
  });

  const navigation = useNavigation();

  const handleFocus = useCallback(() => {
    inputRef.current?.clear();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', handleFocus);

    return () => navigation.removeListener('focus', handleFocus);
  }, [navigation, handleFocus]);

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
          ref={inputRef}
          autoCapitalize="words"
          placeholder="Procurar..."
          returnKeyType="search"
          placeholderTextColor="#aaa"
          onChangeText={value => {
            inputValueRef.current.value = value;
            handleSearchDelayed(value);
          }}
          // value={inputValueRef.current.value}
        />
      </InputContainer>
    </Container>
  );
};

export default Header;
