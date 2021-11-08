import React from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import { Route, Switch, useLocation, useHistory, } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/protected-route';
import { Location } from 'history';

import Modal from '../modal/modal';
import IngredientDetais from '../ingridient-details/ingridient-details';
import { useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerVendor from '../burger-vendor/burger-vendor';
import { LoginPage, RegistrationPage, ForgotPage, ResetPassword, ProfilePage, IngridientPage } from '../../pages';

type TLocationState = {
  background?: Location;
};

function App() {

  const history = useHistory();
  let location = useLocation<TLocationState | undefined>();
  // console.log('location ', location);

  // background станет не undefined, когда произойдёт клик по одному из ингридиентов в BurgerIngridients
  // background - это объект location, соответствующий адресу, на котором мы находились, когда произошёл клик по ингридиенту (т.е. '/' ))
  // если таки background !== undefined, он будет использован в качестве location для Switch, и тогда BurgerVendor будет показан в качестве фона под модальным окном с информацией об ингридиенте
  let background = location.state && location.state.background;
  console.log('background', background);

  const { modalIsVisible, ingrInModalData } = useSelector((store: any) => store.burgerVendor); // хранилище типизируем в следующем спринте

  // фикс, чтобы при перезагрузке с url ингридиента открывалась отдельная страница, а не попап
  React.useEffect(() => {
    history.replace({
      state: { background: undefined },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppHeader />

      <main className={indexStyles.main}>
        <Switch location={background || location}>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/registration">
            <RegistrationPage />
          </Route>

          <Route path="/forgot-password">
            <ForgotPage />
          </Route>

          <Route path="/reset-password">
            <ResetPassword />
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact={true}>
            /profile/orders — страница истории заказов пользователя. Доступен только авторизованным пользователям.
            <br /><a href="/profile/orders/123">Страница заказа 123</a> {/* Не работает, что-то с правом доступа не то */}
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id">
            /profile/orders/:id — страница заказа в истории заказов. Доступен только авторизованным пользователям.

          </ProtectedRoute>

          {/* <ProtectedRoute path="/profile/orders">
            <ProfileOrdersPage />
          </ProtectedRoute> */}

          <Route path="/ingredients/:id">
            <IngridientPage />
          </Route>

          <Route path="/feed" exact={true}>
            /feed — страница ленты заказов. Доступен всем пользователям.
          </Route>

          <Route path="/feed/:id">
            /feed/:id — страница заказа в ленте. Доступен всем пользователям.
          </Route>

          <Route path="/" exact={true}>{/* exact={true}>; */}
            <BurgerVendor />
          </Route>
        </Switch>

        {/* Вот это модалка с ингридиентом поверх конструктора бургеров */}
        {background && (
          <Route path="/ingredients/:id">
            {modalIsVisible && (
              <Modal>
                <IngredientDetais ingredientData={ingrInModalData} />
              </Modal>
            )}
            {/* TODO: Сюда добавить полноразмерное окно заказа через /feed и заказа через /profile/orders/:id */}
          </Route>
        )}
      </main>
    </>
  );
}

export default App;
