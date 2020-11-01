import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';

import { DayOfMonth, Schedule } from '.';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 10px;
  padding: 0 20px;
  position: relative;
`;

export const PageTitle = styled.Text`
  font-size: 26px;
  margin-top: 15px;
`;

export const MonthContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 30px;
  padding: 2px 5px;

  border-bottom-width: 1px;
  border-bottom-color: #999;
`;

export const Month = styled.Text`
  font-size: 16px;
`;

export const MonthPickerContainer = styled.View`
  position: absolute;
  bottom: 10px;
`;

export const DaysList = styled(FlatList as new () => FlatList<DayOfMonth>)`
  margin-top: 20px;
  height: 43px;
`;

type DayProps = {
  selected: boolean;
};

export const DayContainer = styled.TouchableOpacity<DayProps>`
  ${({ selected }) => css`
    height: 45px;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    ${selected &&
    css`
      background: #4b73ff;
      padding: 5px 8px;
    `}
  `}
`;

export const DayNumberText = styled.Text<DayProps>`
  ${({ selected }) => css`
    font-size: 16px;

    ${selected &&
    css`
      color: #fff;
    `}
  `}
`;

export const DayDescriptionText = styled.Text`
  color: #fff;
`;

export const ResultContainer = styled.View``;

export const ScheduleList = styled(FlatList as new () => FlatList<Schedule>)``;

export const ScheduleContainer = styled.TouchableOpacity``;

export const ProviderImage = styled.Image``;

export const ProviderInfo = styled.View``;

export const ProviderName = styled.Text``;

export const ScheduleTimeContainer = styled.View``;

export const ScheduleTimeText = styled.Text``;
