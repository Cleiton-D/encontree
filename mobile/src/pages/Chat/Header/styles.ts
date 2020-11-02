import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProviderContainer = styled.View`
  align-items: center;
`;

export const ProviderImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const ProviderName = styled.Text`
  ${({ theme }) => css`
    margin-top: 5px;
    font-size: 16px;
    font-weight: ${theme.font.medium};
  `}
`;

export const ProviderNickname = styled.Text`
  color: #666;
`;
