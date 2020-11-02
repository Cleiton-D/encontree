import React, { useState, useEffect, useCallback } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { StackParamList } from '../../routes/app.routes';

import Header from '../../components/Header';

import SearchHeader from './Header';

import {
  Container,
  ResultList,
  ProviderContainer,
  ProviderImage,
  ProviderInfo,
  ProviderName,
  ProviderUsername,
  ProviderCategory,
  EmptyResults,
} from './styles';
import api from '../../services/api';

type ScheduleCreatedProp = RouteProp<StackParamList, 'Search'>;

export type Provider = {
  id: string;
  user: {
    name: string;
    username: string;
    avatar_url: string;
  };
  category: {
    description: string;
  };
};

type SearchProps = {
  search?: string;
  category?: string;
};

const Search = (): JSX.Element => {
  const { params: routeParams } = useRoute<ScheduleCreatedProp>();

  const [data, setData] = useState<Provider[]>([]);
  const [search, setSearch] = useState(routeParams.search);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const params: SearchProps = {};
      if (search) params.search = search;
      if (routeParams.category) params.category = routeParams.category;

      const response = await api.get('providers', {
        params,
      });

      setData(response.data);
    }
    loadData();
  }, [routeParams, search]);

  return (
    <>
      <Header>
        <SearchHeader
          defaultValue={routeParams.search}
          onTextChange={handleSearch}
        />
      </Header>
      <Container>
        {data.length > 0 ? (
          <ResultList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProviderContainer activeOpacity={0.7}>
                <ProviderImage
                  source={{ uri: item.user.avatar_url || undefined }}
                />
                <ProviderInfo>
                  <ProviderName>{item.user.name}</ProviderName>
                  <ProviderUsername>@{item.user.username}</ProviderUsername>
                  <ProviderCategory>
                    {item.category.description}
                  </ProviderCategory>
                </ProviderInfo>
              </ProviderContainer>
            )}
          />
        ) : (
          <EmptyResults>Nenhum resultado encontrado :(</EmptyResults>
        )}
      </Container>
    </>
  );
};

export default Search;
