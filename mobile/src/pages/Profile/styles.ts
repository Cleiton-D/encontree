import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    font-size: 26px;
  `}
`;
