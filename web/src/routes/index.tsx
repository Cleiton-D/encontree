import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Conversations from '../pages/Conversations';
import Chat from '../pages/Chat';

import Route from './Route';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/profile" isPrivate component={Profile} />
    <Route path="/conversations" isPrivate component={Conversations} />
    <Route path="/chat/:userId" isPrivate component={Chat} />
  </Switch>
);

export default Routes;
