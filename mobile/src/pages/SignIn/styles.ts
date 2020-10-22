import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Form } from '@unform/mobile';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 0 20px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Logo = styled.Image`
  margin-top: 10px;
  width: 230px;
  height: 50px;
`;

export const LoginImage = styled.Image`
  margin-top: 70px;
  width: 350px;
  height: 209px;
`;

export const FormContainer = styled(Form)`
  flex: 1;
  justify-content: flex-end;
  margin-top: 70px;
  width: 100%;
`;

export const CreateAccountContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: ${10 + getBottomSpace()}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountText = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: ${theme.font.medium};
    color: #333;
  `}
`;

export const CreateAccountButton = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const CreateAccountButtonText = styled.Text`
  ${({ theme }) => css`
    font-size: 18px;
    font-weight: ${theme.font.medium};
    color: #4b73ff;
  `}
`;
