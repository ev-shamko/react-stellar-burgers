import React, { useEffect } from "react";
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import { Route, Switch, useLocation, useHistory, } from 'react-router-dom';

import { useAppDispatch } from '../../services/hooks';
import { confirmAuthThunk } from '../../services/actions/userActions';
import {
  getIngridientsDataThunk,
} from '../../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../../utils/api-url';

import { ProtectedRoute } from '../protected-route/protected-route';
import { Location } from 'history';

import Modal from '../modal/modal';
import IngredientDetais from '../ingridient-details/ingridient-details';
import { useAppSelector } from '../../services/hooks';

import AppHeader from '../app-header/app-header';
import BurgerVendor from '../burger-vendor/burger-vendor';
import { FeedDetailedCard } from '../feed-detailed-card/feed-detailed-card';

import { LoginPage, RegistrationPage, ForgotPage, ResetPassword, ProfilePage, FeedPage, IngridientPage, ProfileOrdersPage, OrderPage } from '../../pages';

// нужно для функционала отображения модальных окон поверх основного контента страницы, и чтобы при этом url менялся
type TLocationState = {
  ingredientModal?: Location;
  feedModal?: Location;
  profileOrderModal?: Location;
};

function App() {

  const history = useHistory();
  let location = useLocation<TLocationState | undefined>();
  // console.log('location ', location);

  // background станет не undefined, когда произойдёт клик по одному из ингридиентов в BurgerIngridients
  // background - это объект location, соответствующий адресу, на котором мы находились, когда произошёл клик по ингридиенту (т.е. '/' ))
  // если таки background !== undefined, он будет использован в качестве location для Switch, и тогда BurgerVendor будет показан в качестве фона под модальным окном с информацией об ингридиенте

  // let background = location.state && location.state.background; // фикс: это не надо
  // console.log('background', background);

  const action = history.action === 'PUSH' || history.action === 'REPLACE'; //  history.action is mutable and automatically updates as the location changes. https://github.com/remix-run/history/blob/main/docs/api-reference.md 

  // три переменные ниже - это, по сути, background для каждого из модальных окон
  const modalIngredientOpen = action && location.state && location.state.ingredientModal;
  const modalFeedOrderOpen = action && location.state && location.state.feedModal;
  const modalProfileOrderOpen = action && location.state && location.state.profileOrderModal;


  const { ingrInModalData } = useAppSelector((store) => store.burgerVendor); // хранилище типизируем в следующем спринте

  // фикс, чтобы при перезагрузке с url ингридиента открывалась отдельная страница, а не попап
  // React.useEffect(() => {
  //   history.replace({
  //     state: { background: undefined },
  //   });
  //   // eslint-disable-next-line
  // }, []);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(confirmAuthThunk());
    dispatch(getIngridientsDataThunk(urlApiGetIngridients));
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      <main className={indexStyles.main}>
        {/* <Switch location={background || location}> */}
        <Switch location={modalIngredientOpen || modalFeedOrderOpen || modalProfileOrderOpen || location}>

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
            <ProfileOrdersPage />

          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id">
            {/* /profile/orders/:id — страница заказа в истории заказов. Доступна только авторизованным пользователям. */}
            <OrderPage orderSource={'personalOrder'} />

          </ProtectedRoute>

          {/* <ProtectedRoute path="/profile/orders">
            <ProfileOrdersPage />
          </ProtectedRoute> */}

          <Route path="/ingredients/:id">
            <IngridientPage />
          </Route>

          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>

          <Route path="/feed/:id">
            {/* Страница конкретного заказа из /feed */}
            <OrderPage orderSource={'feed'} />
          </Route>

          <Route path="/" exact={true}>{/* exact={true}>; */}
            <BurgerVendor />
          </Route>
        </Switch>

        {/* Вот это модальные окна с разным содержимым. Модальные окна - это именно когда окно поверх основного контента страницы */}
        {modalIngredientOpen && (
          <Route path="/ingredients/:id">
              <Modal>
                <IngredientDetais ingredientData={ingrInModalData} />
              </Modal>
          </Route>
        )}
        
        {modalFeedOrderOpen && (
          <Route path="/feed/:id">
              <Modal>
                <FeedDetailedCard />
              </Modal>
          </Route>
        )}

        {modalProfileOrderOpen && (
          <ProtectedRoute path="/profile/orders/:id">
              <Modal>
                <FeedDetailedCard />
              </Modal>
          </ProtectedRoute>
        )}

      </main>
    </>
  );
}

export default App;
