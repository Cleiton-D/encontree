import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import {
  PageTitle,
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
  searchTerm?: string;
};

const Search = ({ searchTerm }: SearchProps): JSX.Element => {
  const [data, setData] = useState<Provider[]>([]);

  useEffect(() => {
    async function loadData(): Promise<void> {
      if (searchTerm) {
        const response = await api.get(
          `providers?search=${encodeURIComponent(searchTerm)}`,
        );

        setData(response.data);
      }
    }
    loadData();
  }, [searchTerm]);

  return (
    <Container>
      <PageTitle>Resultados da pesquisa</PageTitle>
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
                <ProviderCategory>{item.category.description}</ProviderCategory>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      ) : (
        <EmptyResults>Nenhum resultado encontrado :(</EmptyResults>
      )}
    </Container>
  );
};

export default Search;
