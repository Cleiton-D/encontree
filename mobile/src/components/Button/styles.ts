import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #4b73ff;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: #fff;
    font-size: 20px;
    font-weight: ${theme.font.bold};
  `}
`;
