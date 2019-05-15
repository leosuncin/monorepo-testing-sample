import React, { FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import { Login } from './components/Login';
import { Counter } from './components/Counter';
import { Register } from './components/Register';

const Router: FC = () => (
  <BrowserRouter>
    <Route path="/" exact={true} component={App} />
    <Route path="/sign-in" component={Login} />
    <Route path="/sign-up" component={Register} />
    <Route path="/counter" component={Counter} />
  </BrowserRouter>
);

export default Router;
