import React from 'react';
import {
  Redirect,
  Route as ReactRouter,
  RouteProps as ReactRouterProps,
  useHistory,
} from 'react-router-dom';

import Header from '../components/Header';
import PageContentWrapper from '../components/PageContentWrapper';

import { useAuth } from '../hooks/auth';

type RouteProps = ReactRouterProps & {
  isPrivate?: boolean;
};

const Route = ({ isPrivate = false, ...rest }: RouteProps): JSX.Element => {
  const { user } = useAuth();
  const { location } = useHistory();

  if (isPrivate === !!user) {
    if (isPrivate) {
      return (
        <>
          <Header />
          <PageContentWrapper>
            <ReactRouter {...rest} />
          </PageContentWrapper>
        </>
      );
    }

    return (
      <PageContentWrapper>
        <ReactRouter {...rest} />
      </PageContentWrapper>
    );
  }

  return (
    <Redirect
      to={{
        pathname: isPrivate ? '/' : '/dashboard',
        state: { from: location },
      }}
    />
  );
};

export default Route;
