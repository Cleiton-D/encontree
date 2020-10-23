import styled, { css } from 'styled-components/native';
import { Form } from '@unform/mobile';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
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
  margin-top: 30px;
  width: 230px;
  height: 230px;
`;

export const FormContainer = styled(Form)`
  margin-top: 40px;
  width: 100%;
`;

export const SignInContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: ${10 + getBottomSpace()}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SignInText = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: ${theme.font.medium};
    color: #333;
  `}
`;

export const SignInButton = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const SignInButtonText = styled.Text`
  ${({ theme }) => css`
    font-size: 18px;
    font-weight: ${theme.font.medium};
    color: #4b73ff;
  `}
`;
