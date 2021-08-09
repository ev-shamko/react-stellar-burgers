import React from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import BurgerVendor from '../burger-vendor/burger-vendor';
import { LoginPage, RegistrationPage, ForgotPage, ResetPassword, ProfilePage } from '../../pages';


function App() {

  return (
    <>
      {/* {console.log('РЕНДЕРЮ app.jsx')} */}
      <Router>
        <AppHeader />

        <main className={indexStyles.main}>
          <Switch>

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

            <Route path="/profile">
              <ProfilePage />
            </Route>

            <Route path="/">{/* exact={true}>; */}
              <BurgerVendor />
            </Route>

          </Switch>

        </main>
      </Router>
    </>
  );
}

export default App;
