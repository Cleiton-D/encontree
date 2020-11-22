import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { debounce } from 'lodash';

import { PageTopContainer, PageTitle, InputContainer, Input } from './styles';

type HeaderProps = {
  defaultValue?: string;
  onTextChange: (value: string) => void;
};

const Header = ({ defaultValue, onTextChange }: HeaderProps): JSX.Element => {
  const [value, setValue] = useState(defaultValue);

  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearchDelayed = useMemo(() => debounce(onTextChange, 1000), [
    onTextChange,
  ]);

  const handleChange = useCallback(
    (inputValue: string) => {
      setValue(inputValue);
      handleSearchDelayed(inputValue);
    },
    [handleSearchDelayed],
  );

  return (
    <SafeAreaView>
      <PageTopContainer>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="chevron-left" size={20} />
        </TouchableOpacity>
        <PageTitle>Resultados da pesquisa</PageTitle>
      </PageTopContainer>
      <InputContainer>
        <Icon name="search" size={18} color="#999" />
        <Input
          ref={inputRef}
          autoCapitalize="words"
          placeholder="Procurar..."
          returnKeyType="search"
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={handleChange}
        />
      </InputContainer>
    </SafeAreaView>
  );
};

export default Header;
