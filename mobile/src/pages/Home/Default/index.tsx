import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';

import {
  Container,
  ProvidersContainer,
  ProvidersTextContainer,
  ProvidersTitle,
  ProvidersViewAllButton,
  ProvidersViewAllButtonText,
  ProvidersList,
  ProviderContainer,
  ProviderImageContainer,
  ProviderImage,
  ProviderName,
  CategoriesContainer,
  CategoriesTextContainer,
  CategoriesTitle,
  CategoriesList,
  CategoryContainer,
  CategoryImageContainer,
  CategoryDescription,
  CategoryImage,
} from './styles';

export type Provider = {
  id: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export type Category = {
  id: string;
  description: string;
  image_url: string;
};

const Default = (): JSX.Element => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigation = useNavigation();

  const handleNavigate = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateSchedule', { providerId });
    },
    [navigation],
  );

  const handleSelectCategory = useCallback(
    (category: string) => {
      navigation.navigate('Search', { category });
    },
    [navigation],
  );

  const handleViewAll = useCallback(() => {
    navigation.navigate('Search', {});
  }, [navigation]);

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const response = await api.get('providers', { params: { limit: 5 } });
      setProviders(response.data);
    }
    loadProviders();
  }, []);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('categories');
      setCategories(response.data);

      console.log(response.data);
    }
    loadCategories();
  }, []);

  return (
    <Container>
      <ProvidersContainer>
        <ProvidersTextContainer>
          <ProvidersTitle>Prestadores de serviço</ProvidersTitle>
          <ProvidersViewAllButton onPress={handleViewAll}>
            <ProvidersViewAllButtonText>Ver todos</ProvidersViewAllButtonText>
          </ProvidersViewAllButton>
        </ProvidersTextContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProviderContainer
              activeOpacity={0.55}
              onPress={() => handleNavigate(item.id)}
            >
              <ProviderImageContainer>
                <ProviderImage
                  source={{ uri: item.user.avatar_url || undefined }}
                />
              </ProviderImageContainer>
              <ProviderName numberOfLines={2} ellipsizeMode="tail">
                {item.user.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersContainer>

      <CategoriesContainer>
        <CategoriesTextContainer>
          <CategoriesTitle>Categorias</CategoriesTitle>
        </CategoriesTextContainer>
        <CategoriesList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CategoryContainer
              activeOpacity={0.55}
              onPress={() => handleSelectCategory(item.id)}
            >
              <CategoryImageContainer>
                <CategoryImage source={{ uri: item.image_url || undefined }} />
              </CategoryImageContainer>
              <CategoryDescription numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </CategoryDescription>
            </CategoryContainer>
          )}
        />
      </CategoriesContainer>
    </Container>
  );
};

export default Default;
