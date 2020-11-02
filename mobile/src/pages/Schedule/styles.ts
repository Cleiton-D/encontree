import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 100%;
  background: #fff;
`;

export const ScheduleDetailContainer = styled.View`
  margin-top: 35px;
  background: #fff;
  border-width: 2px;
  border-color: #c2d5ff;
  border-radius: 15px;
`;

export const ProviderDetail = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;

  border-bottom-width: 1px;
  border-bottom-color: #c2d5ff;
`;

export const ProviderImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const ProviderInfo = styled.View``;

export const ProviderName = styled.Text`
  font-size: 20px;
  color: #333;
`;

export const ProviderNickname = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const ScheduleServiceDetails = styled.View`
  padding: 15px 30px;
`;

export const ScheduleTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ScheduleTimeItem = styled.View``;

export const ScheduleTimeItemTitle = styled.Text`
  font-size: 18px;
  color: #666;
`;

export const ScheduleTimeItemValue = styled.Text`
  font-size: 16px;
`;

export const ScheduleDescriptionContainer = styled.View`
  margin-top: 30px;
`;

export const ScheduleDescriptionTitle = styled.Text`
  font-size: 18px;
  color: #666;
`;

export const ScheduleDescriptionValue = styled.Text`
  font-size: 16px;
`;

export const SendMessageButtonContainer = styled.View`
  margin-top: 15px;
  padding: 0 30px;
`;
