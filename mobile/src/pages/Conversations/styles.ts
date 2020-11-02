import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { User } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const ConversationList = styled(FlatList as new () => FlatList<User>)`
  margin-top: 40px;
  padding: 10px 20px;
  bottom: ${getBottomSpace()}px;
`;

export const ConversationItem = styled.TouchableOpacity`
  position: relative;

  flex-direction: row;
  align-items: center;
  border-radius: 5px;

  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-bottom: 20px;
`;

export const ProviderImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const ProviderName = styled.Text`
  font-size: 20px;
`;

export const EndContainerIcon = styled(Icon)`
  position: absolute;
  right: 10px;
`;
