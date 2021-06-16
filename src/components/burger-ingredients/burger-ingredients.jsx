import React from "react";
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

    return (
        <section className={ingrStyles.ingridiensContainer}>
            {/* {console.log('Рендерю компонент BurgerIngridients')} */}
            <div className={ingrStyles.tabs}>
                {/* Компонент <Tab /> в функцию из onClick={} в качестве аргумента передаёт не event, а значение пропса value={} */}
                <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>Булки</Tab>
                <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>Соусы</Tab>
                <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTab}>Начинки</Tab>
            </div>
            
            <div className={ingrStyles.ingrDisplay + ' mt-10'}>

                {/* Булки */}
                <div className={ingrStyles.ingrShowcase}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"bun"} openModal={openModal} />
                    </div>
                </div>

                {/* Соусы */}
                <div className={ingrStyles.ingrShowcase}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"sauce"} openModal={openModal} />
                    </div>
                </div>

                {/* Начинки */}
                <div className={ingrStyles.ingrShowcase}>
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