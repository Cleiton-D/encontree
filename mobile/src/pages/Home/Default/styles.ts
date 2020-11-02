import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Provider, Category } from '.';

export const Container = styled.View``;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
  max-height: 260px;
`;

export const ProviderContainer = styled.TouchableOpacity`
  width: 130px;
  margin-right: 25px;
  border-radius: 15px;
  align-items: center;
`;

export const ProviderImageContainer = styled.View`
  background: #fff;
  border-radius: 15px;
  border: 1px solid #dbe6ff;
`;

export const ProviderImage = styled.Image`
  width: 130px;
  height: 170px;
  border-radius: 15px;
`;

export const ProviderName = styled.Text`
  margin-top: 5px;
  text-align: center;
`;

export const CategoriesContainer = styled.View`
  margin-top: 40px;
`;

export const CategoriesTextContainer = styled.View`
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const CategoriesTitle = styled.Text`
  font-size: 18px;
`;

export const CategoriesViewAllButton = styled.TouchableOpacity``;

export const CategoriesViewAllButtonText = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const CategoriesList = styled(FlatList as new () => FlatList<Category>)`
  padding: 10px 24px;
`;

export const CategoryContainer = styled.TouchableOpacity`
  width: 130px;
  margin-right: 25px;
  border-radius: 15px;
  align-items: center;
`;

export const CategoryImageContainer = styled.View`
  background: #fff;
  border-radius: 15px;
  border: 1px solid #dbe6ff;
`;

export const CategoryImage = styled.Image`
  width: 130px;
  height: 170px;
  border-radius: 15px;
`;

export const CategoryDescription = styled.Text`
  margin-top: 5px;
  text-align: center;
`;
