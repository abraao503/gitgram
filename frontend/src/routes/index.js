import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import TemplatePage from '../pages/TemplatePage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <TemplatePage>
          <Route path="/home" exact component={Home} isPrivate/>
          <Route path="/profile" exact component={Profile} isPrivate/>
        </TemplatePage>
      </Switch>
    </BrowserRouter>
  )
}
