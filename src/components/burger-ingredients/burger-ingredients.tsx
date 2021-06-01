import React from "react";
import ingrStyles from "./burger-ingredients.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card"
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
                            <div className={ingrStyles.zaglushka + ' mb-8'}></div>
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
                            <IngridientCard />
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

export default BurgerIngredients;