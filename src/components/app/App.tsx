import React from 'react';
import logo from '../../images/logo.svg';
import indexStyles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <>
      <AppHeader />
      <main className={indexStyles.main}>
        <section className={indexStyles.headerSection}>
          <h1 className="text text_type_main-large">Собери бургер</h1>
        </section>
        <section className={indexStyles.constructorContainer}>
          <BurgerIngredients />
          {/* <BurgerConstructor /> */}
          {/*<div className={indexStyles.zaglushka}></div>*/}
          <div className={indexStyles.zaglushka}></div>
        </section>

      </main>
    </>
  );
}

export default App;
