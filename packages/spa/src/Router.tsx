import React, { FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import { Login } from './components/Login';
import { Counter } from './components/Counter';
import { Register } from './components/Register';
import { AppContextProvider } from './context/app';
import Profile from './components/Profile';

const Router: FC = () => (
  <AppContextProvider>
    <BrowserRouter>
      <Route path="/" exact={true} component={App} />
      <Route path="/counter" component={Counter} />
      <Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={Register} />
      <Route path="/profile" component={Profile} />
    </BrowserRouter>
  </AppContextProvider>
);

export default Router;
