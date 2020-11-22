import styled from 'styled-components/native';
import { FlatList, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Conversation } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const ConversationList = styled(
  FlatList as new () => FlatList<Conversation>,
)`
  margin-top: ${Platform.OS === 'ios' ? 40 : 10}px;
  padding: 10px 20px;
  bottom: ${getBottomSpace()}px;
`;

export const ConversationItem = styled.TouchableOpacity`
  position: relative;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-bottom: 20px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
`;

export const ProviderImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 5px;
`;

export const ProviderName = styled.Text`
  font-size: 20px;
`;

export const EndContainerIcon = styled(Icon)`
  margin-left: 10px;
`;
