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
  max-height: 60px;
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

export const ResultContainer = styled.View`
  flex: 1;
  padding-bottom: 80px;
`;

export const ScheduleList = styled(FlatList as new () => FlatList<Schedule>)`
  padding: 5px;
  padding-top: 20px;
`;

export const ScheduleContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;

  background: #fff;
  height: 100px;
  border-radius: 5px;
  padding: 8px;

  shadow-color: #c2d5ff;
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 2px;
  elevation: 1;
`;

export const ProviderImage = styled.Image`
  height: 100%;
  background: #f1f1f1;
  width: 70px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dbe6ff;
  margin-right: 15px;
`;

export const ProviderInfo = styled.View`
  padding: 10px 0;
`;

export const ProviderName = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const ScheduleTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 8px;
`;

export const ScheduleTimeText = styled.Text`
  margin-left: 5px;
  color: #666;
`;
