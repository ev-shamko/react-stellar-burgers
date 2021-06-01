import React from "react";
import ingrStyles from "./burger-ingredients.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card"
import ingridientsList from "../../utils/data";
import {
    Tab,

    /*
счётчики,
иконки,
переключатели,
типографику,
систему отступов.*/
} from "@ya.praktikum/react-developer-burger-ui-components";

const testFunc = () => {
    console.log('clicked');
}

/*
const obj = {
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
};
*/

class BurgerIngredients extends React.Component {
    render() {
        return (
            <section className={ingrStyles.ingridiensContainer}>
                <div className={ingrStyles.tabs}>
                    <Tab value="one" active={true} onClick={testFunc}>Булки</Tab>
                    <Tab value="two" active={false} onClick={testFunc}>Соусы</Tab>
                    <Tab value="three" active={false} onClick={testFunc}>Начинки</Tab>
                </div>
                <div className={ingrStyles.ingrDisplay + ' mt-10'}>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Булки</h3>
                        <div className={ingrStyles.ingrList}>
                            <IngridientCard image={ingridientsList[0].image} price={ingridientsList[0].price} name={ingridientsList[0].name}  />
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                        </div>
                    </div>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Соусы</h3>
                        <div className={ingrStyles.ingrList}>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                        </div>
                    </div>

                    <div className={ingrStyles.ingrShowcase}>
                        <h3 className="text text_type_main-medium">Начинки</h3>
                        <div className={ingrStyles.ingrList}>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

export default BurgerIngredients;