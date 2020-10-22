import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 16px;

  border-radius: 3px;
  border-width: 2px;
  border-color: #b6cdf0;

  margin-bottom: 25px;
`;

export const TextInput = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    color: #666;
    font-size: 16px;
    font-weight: ${theme.font.medium};
  `}
`;
