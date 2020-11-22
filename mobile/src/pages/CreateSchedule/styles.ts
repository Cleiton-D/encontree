import styled, { css } from 'styled-components/native';

export const Container = styled.View``;

export const Content = styled.ScrollView`
  padding: 0 24px;
  height: 100%;
`;

export const ChooseDateContainer = styled.View`
  margin-top: 50px;
`;

export const ChooseDateTitle = styled.Text`
  ${({ theme }) => css`
    font-size: 22px;
    font-weight: ${theme.font.medium};
    margin-bottom: 10px;
  `}
`;

export const ChooseHourContainer = styled.View`
  margin-top: 50px;
`;

export const ChooseHourTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ChooseHourTitle = styled.Text`
  ${({ theme }) => css`
    font-size: 22px;
    font-weight: ${theme.font.medium};
    margin-bottom: 10px;
  `}
`;

export const ChooseHourTitleDate = styled.Text`
  color: #666;
  font-size: 16px;
`;

export const ChooseHourSelectContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
`;

type ChooseHourItemProps = {
  available: boolean;
  selected: boolean;
};

export const ChooseHourItem = styled.TouchableOpacity<ChooseHourItemProps>`
  ${({ available, selected }) => css`
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    padding: 10px 0;
    width: 62px;
    border-radius: 5px;
    border-width: 1px;
    border-color: #b0c8ff;
    background: #ecf2ff;

    ${!available &&
    css`
      background: #f2f2f2;
    `}

    ${selected &&
    css`
      background: #4b73ff;
    `}
  `}
`;

export const ChooseHourItemText = styled.Text<ChooseHourItemProps>`
  ${({ theme, available, selected }) => css`
    font-weight: ${theme.font.medium};

    ${!available &&
    css`
      color: #bbb;
    `}

    ${selected &&
    css`
      color: #fff;
    `}
  `}
`;

export const ReserveButtonWrapper = styled.View`
  margin-top: 50px;
`;
