import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';

import api from '../../../services/api';

import {
  Container,
  ProvidersList,
  ProviderContainer,
  ProviderImageContainer,
  ProviderImage,
  ProviderName,
  CategoriesContainer,
  CategoriesTextContainer,
  CategoriesTitle,
  CategoriesViewAllButton,
  CategoriesViewAllButtonText,
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

type CategoryProps = {
  onSelectCategory: (categoryId: string) => void;
};

const Default = ({ onSelectCategory }: CategoryProps): JSX.Element => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigation = useNavigation();

  const handleNavigate = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateSchedule', { providerId });
    },
    [navigation],
  );

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const response = await api.get('providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('categories');
      setCategories(response.data);
    }
    loadCategories();
  }, []);

  return (
    <Container>
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

      <CategoriesContainer>
        <CategoriesTextContainer>
          <CategoriesTitle>Categorias</CategoriesTitle>
          <CategoriesViewAllButton>
            <CategoriesViewAllButtonText>Ver todas</CategoriesViewAllButtonText>
          </CategoriesViewAllButton>
        </CategoriesTextContainer>
        <CategoriesList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CategoryContainer
              activeOpacity={0.55}
              onPress={() => onSelectCategory(item.id)}
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
