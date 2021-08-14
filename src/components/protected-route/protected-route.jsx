import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);

  // если не залогинен, записать в стейт, куда должен вернуться

  return (
    <Route {...rest} render={({ location }) =>
      isLoggedIn ?
        (children) :
        (<Redirect to={{
          pathname: "/login",
          state: { from: location }, // https://reactrouter.com/web/api/Redirect/to-object 
        }} />)
    } />
  );
}
