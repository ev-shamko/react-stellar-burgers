import React from "react";
import PropTypes from 'prop-types';
import ingrStyles from "./burger-ingredients.module.css";
import CardList from "../ingridients-cardlist/ingridients-cardlist";
import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

// <BurgerIngredients openModal={openModal} /> 
function BurgerIngredients({/*allIngridients,*/ openModal }) {

    // этот стейт нужен для переключения активного таба в компоненте <Tab />
    // компонент <Tab /> "под капотом" передаёт этому методу в качестве аргумента значение пропса value
    const [currentTab, setCurrentTab] = React.useState('one');

    return (
        <section className={ingrStyles.ingridiensContainer}>
            {console.log('Рендерю компонент BurgerIngridients')}
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

// в этом индентификаторе записан валидатор для объектов, находящихся внутри массива this.props.allIngridients
// мы ожидаем, что массив this.props.allIngridients будет состоять из объектов с такой структурой
// const ingridientsInnerObjStructure = PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     proteins: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     calories: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     image_mobile: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
//     __v: PropTypes.number.isRequired,
// });

BurgerIngredients.propTypes = {
    // allIngridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired), // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
    openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;

/*  Пример объекта, содержащегося в массиве с ингридиентами this.props.allIngridients :
{
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}*/