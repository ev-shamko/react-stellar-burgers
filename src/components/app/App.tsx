import React from 'react';
import logo from '../../images/logo.svg';
import indexStyles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor'

function App() {
  return (
    <>
      <AppHeader />
      <main className={indexStyles.main}>
        <section className={indexStyles.headerSection}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
        </section>
        {/** Ради пиксельпёрфекта секция ниже - это флекс-контейнер,
         * растущий слева направо. Он выходит за правую границу родительского <main>.
         */}
        <section className={indexStyles.constructorContainer}>
          <BurgerIngredients />
          <BurgerConstructor />
          {/*<div className={indexStyles.zaglushka}></div>*/}
        </section>

      </main>
    </>
  );
}

export default App;
