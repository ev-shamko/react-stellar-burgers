import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { appUseSelector } from '../../services/hooks';
import { RouteProps } from 'react-router';

export function ProtectedRoute({ children, ...rest }: RouteProps) {

  const { isLoggedIn, userChecked } = appUseSelector((store) => store.user);

  if (localStorage.getItem('refreshToken') && !userChecked) return null;
  
  // useEffect(() => {
  // если совершён прямой переход на защищённые роуты, стейт isLoggedIn всегда будет false. Тогда пользователя редиректнет на /login без лишнего запроса к серверу
  // если пользователь залогинен, произойдёт проверка актуальности токенов, только потом пустит на защищённые роуты
  //   if (isLoggedIn) {
  //     console.log('Auth in ProtectedRout');
  //     dispatch(confirmAuth());
  //   }
  // }, [dispatch, isLoggedIn]);

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
