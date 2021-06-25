import React, { useRef } from "react";
import PropTypes from 'prop-types';
import ingrStyles from "./burger-ingredients.module.css";
import CardList from "../ingridients-cardlist/ingridients-cardlist";

import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

// <BurgerIngredients openModal={openModal} /> 
function BurgerIngredients({ openModal }) {

    // этот стейт нужен для переключения активного таба в компоненте <Tab />
    // компонент <Tab /> "под капотом" передаёт этому методу в качестве аргумента значение пропса value
    const [currentTab, setCurrentTab] = React.useState('one');

    // рефы и scrollIntoRef используются для автопрокрутки блока с ингридиентами при клике на табы с названиями типов ингридиентов
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    function scrollIntoRef(stringArg) {
        // в этом объекте ключи должны соответствовать типам ингридиентов бургера.
        // Пока что всего 3 типа ингридиентов. Если будут добавлены другие типы ингридиентов, нужно дополнить объект
        const objRefKeys = {
            'bun' : bunRef,
            'sauce' : sauceRef,
            'main' : mainRef
        };

        objRefKeys[stringArg].current.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    const handleClick = (value) => {
        setCurrentTab(value);
        scrollIntoRef(value);
    };

    return (
        <section className={ingrStyles.ingridiensContainer}>
            {/* {console.log('Рендерю компонент BurgerIngridients')} */}
            <div className={ingrStyles.tabs}>
                {/* Компонент <Tab /> в функцию из onClick={} в качестве аргумента передаёт не event, а значение пропса value={} */}
                <Tab value="bun" active={currentTab === 'bun'} onClick={handleClick}>Булки</Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleClick}>Соусы</Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={handleClick}>Начинки</Tab>
            </div>

            <div className={ingrStyles.ingrDisplay + ' mt-10'}>

                {/* Булки */}
                <div className={ingrStyles.ingrShowcase} ref={bunRef}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"bun"} openModal={openModal} />
                    </div>
                </div>

                {/* Соусы */}
                <div className={ingrStyles.ingrShowcase} ref={sauceRef}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"sauce"} openModal={openModal} />
                    </div>
                </div>

                {/* Начинки */}
                <div className={ingrStyles.ingrShowcase} ref={mainRef}>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"main"} openModal={openModal} />
                    </div>
                </div>

            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;