import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding: 0 35px;
  align-items: center;
  position: relative;
  margin-top: 30%;
`;

export const ScheduleCreatedText = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.font.medium};
    font-size: 32px;
    text-align: center;
  `}
`;

export const ScheduleDateText = styled.Text`
  margin-top: 28px;
  font-size: 18px;
  color: #666;
  margin-bottom: 80px;
`;
