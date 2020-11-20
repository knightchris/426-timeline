import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (admin) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',      
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;