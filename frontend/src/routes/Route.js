import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}){
  const signed = localStorage.getItem('userData');

  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/home" />
  }

  return <Route {...rest} component={Component} />;
}
