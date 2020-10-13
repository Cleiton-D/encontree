import React from 'react';
import {
  Redirect,
  Route as ReactRouter,
  RouteProps as ReactRouterProps,
  useHistory,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

type RouteProps = ReactRouterProps & {
  isPrivate?: boolean;
};

const Route = ({ isPrivate = false, ...rest }: RouteProps): JSX.Element => {
  const { user } = useAuth();
  const { location } = useHistory();

  return isPrivate === !!user ? (
    <ReactRouter {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: isPrivate ? '/' : '/dashboard',
        state: { from: location },
      }}
    />
  );
};

export default Route;
