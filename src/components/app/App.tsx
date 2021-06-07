import React from 'react';
import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ingridientsList from '../../utils/data';

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
          <BurgerIngredients allIngridients={ingridientsList} />
          <BurgerConstructor allIngridients={ingridientsList} />
          {/*<div className={indexStyles.zaglushka}></div>*/}
        </section>

      </main>
    </>
  );
}

export default App;
