import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAuth } from '../../services/actions/userActions';

export function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useSelector(store => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Auth in ProtectedRout');
    dispatch(confirmAuth());
  }, [dispatch]);

  return (
    <Route {...rest} render={({ location }) =>
      isLoggedIn ?
        (children) :
        (<Redirect to={{
          pathname: "/login",
          // https://reactrouter.com/web/api/Redirect/to-object 
          state: { from: location }, // этот объект будет доступен на странице /login через this.props.location.state. Из него вытащим роут, на который нужно будет вернуться после успешного логина
        }} />)
    } />
  );
}
