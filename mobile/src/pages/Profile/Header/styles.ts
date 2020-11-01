import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const Content = styled.View`
  padding-top: 20px;
  flex-direction: row;
`;

export const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  background: #f1f1f1;

  border-radius: 35px;
  border-width: 1px;
  border-color: #dbe6ff;
`;

export const UserName = styled.Text`
  margin-top: 10px;
  margin-left: 10px;
  color: #333;
  font-size: 26px;
  max-width: 250px;
`;
