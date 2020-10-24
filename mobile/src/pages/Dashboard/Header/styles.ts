import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const UserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserName = styled.Text`
  font-size: 28px;
`;

export const LogoutButton = styled(RectButton)``;

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;

  background: #f3f3f3;
  height: 36px;
  border-radius: 7px;
  margin-top: 15px;
`;

export const Input = styled.TextInput`
  height: 100%;
  flex: 1;
  margin-left: 10px;

  font-size: 14px;
`;
