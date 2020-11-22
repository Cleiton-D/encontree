import styled, { css } from 'styled-components/native';
import { Form } from '@unform/mobile';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 30px 40px;
  /* padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px; */
`;

export const Logo = styled.Image`
  position: absolute;
  top: 10px;
  align-self: center;
  width: 230px;
  height: 50px;
  z-index: 2;
`;

export const LoginImage = styled.Image`
  width: 350px;
  height: 209px;
`;

export const FormContainer = styled(Form)`
  margin-top: 50px;
  width: 100%;
`;

export const CreateAccountContainer = styled.View`
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 10px;

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
