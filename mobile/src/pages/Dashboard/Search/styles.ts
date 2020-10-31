import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Provider } from '.';

export const Container = styled.View`
  flex: 1;
  margin-top: 25px;
  padding: 0 24px;
`;

export const PageTitle = styled.Text`
  font-size: 22px;
`;

export const ResultList = styled(FlatList as new () => FlatList<Provider>)`
  margin-top: 10px;
  flex: 1;
  padding: 10px 5px;
`;

export const ProviderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

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
  margin-right: 20px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
`;

export const ProviderName = styled.Text`
  color: #333;
  font-size: 18px;
`;

export const ProviderUsername = styled.Text`
  color: #666;
`;

export const ProviderCategory = styled.Text`
  margin-top: 10px;
  margin-left: 5px;
  font-size: 16px;
`;

export const EmptyResults = styled.Text`
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;

  font-size: 18px;
  color: #333;
`;
