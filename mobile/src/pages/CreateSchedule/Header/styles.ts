import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 30px;
  position: relative;
  max-height: 200px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
`;

export const ProviderContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 8px;
`;

export const UserInfo = styled.View``;

export const UserName = styled.Text`
  font-size: 16px;
`;

export const UserNickname = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const ProviderDescription = styled.Text`
  margin-top: 20px;
  color: #333;
`;
