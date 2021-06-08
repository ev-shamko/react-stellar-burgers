import React from "react";
import PropTypes from 'prop-types';

import ingrStyles from "./burger-ingredients.module.css";
//import IngridientCard from "../ingridient-card/ingrdient-card";
import CardList from "../ingridients-cardlist/ingridients-cardlist";
import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

// <BurgerIngredients allIngridients={ingridientsData} openModal={openModal} /> 
// @ts-ignore
class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           currentTab: 'one',
        }

        this.tabSwitch = this.tabSwitch.bind(this);
    }


    // дока как это написать для функционального компонента: https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/tab 

    tabSwitch(value) {
        // console.log(value); // походу принимает не событие, а атрибут/пропс value компонтента <Tab />
        this.setState({
            ...this.state,
            currentTab: value
        });
    }

    render(props) {
        
        return (
            <section className={ingrStyles.ingridiensContainer}>
                <div className={ingrStyles.tabs}>
                    {/* Компонент <Tab /> обрабатывает функцию, переданную в onClick={} и в качестве аргумента передаёт не event, а значение пропса value={} */}
                    <Tab value="one" active={this.state.currentTab === 'one'} onClick={this.tabSwitch}>Булки</Tab>
                    <Tab value="two" active={this.state.currentTab === 'two'} onClick={this.tabSwitch}>Соусы</Tab>
                    <Tab value="three" active={this.state.currentTab === 'three'} onClick={this.tabSwitch}>Начинки</Tab>
                </div>
                <div className={ingrStyles.ingrDisplay + ' mt-10'}>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Булки</h3>
                        <div className={ingrStyles.ingrList}>
                            <CardList type={"bun"} ingridients={this.props.allIngridients} openModal={this.props.openModal} />
                        </div>
                    </div>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Соусы</h3>
                        <div className={ingrStyles.ingrList}>
                            <CardList type={"sauce"} ingridients={this.props.allIngridients} openModal={this.props.openModal} />
                        </div>
                    </div>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Начинки</h3>
                        <div className={ingrStyles.ingrList}>
                            <CardList type={"main"} ingridients={this.props.allIngridients} openModal={this.props.openModal} />
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

// в этом индентификаторе записан валидатор для объектов, находящихся внутри массива this.props.allIngridients
// мы ожидаем, что массив this.props.allIngridients будет состоять из объектов с такой структурой
const ingridientsInnerObjStructure = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

BurgerIngredients.propTypes = {
    allIngridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired) // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
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