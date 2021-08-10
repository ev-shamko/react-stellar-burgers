import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);

  return (
    <Route {...rest} render={() =>
      isLoggedIn ? (children) : (<Redirect to='/login' />)
    } />
  );
}
