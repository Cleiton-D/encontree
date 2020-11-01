import React, { useState, useCallback } from 'react';

import Header from '../../components/Header';

import DashboardHeader from './Header';

import Default from './Default';
import Search from './Search';

const Dashboard = (): JSX.Element => {
  const [search, setSearch] = useState<string | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <>
      <Header>
        <DashboardHeader onSearch={handleSearch} />
      </Header>
      {search ? <Search searchTerm={search} /> : <Default />}
    </>
  );
};

export default Dashboard;
