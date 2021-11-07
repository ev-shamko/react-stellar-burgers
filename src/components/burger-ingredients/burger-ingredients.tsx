import React, { LegacyRef, useRef } from "react";
import ingrStyles from "./burger-ingredients.module.css";
import CardList from "../ingridients-cardlist/ingridients-cardlist";

import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TBunRef = {
    'bun': LegacyRef<HTMLDivElement>, // без подсказок в жизни бы не подобрала подходящий тип, ппц
    'sauce': LegacyRef<HTMLDivElement>,
    'main': LegacyRef<HTMLDivElement>,
}

type TTabName = 'bun' | 'sauce' | 'main';

// <BurgerIngredients openModal={openModal} /> 
function BurgerIngredients() {

    // стейт  для переключения активного таба в компоненте <Tab />
    // компонент <Tab /> "под капотом" передаёт этому методу в качестве аргумента значение пропса value
    const [currentTab, setCurrentTab] = React.useState<string>("bun");

    // рефы и scrollIntoRef используются для автопрокрутки блока с ингридиентами при клике на табы с названиями типов ингридиентов
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    function scrollIntoRef(tabName: TTabName): void {
        // в этом объекте ключи должны соответствовать типам ингридиентов бургера.
        // Пока что всего 3 типа ингридиентов. Если будут добавлены другие типы ингридиентов, нужно дополнить объект
        // const objRefKeys: TBunRef = {
        //     'bun': bunRef,
        //     'sauce': sauceRef,
        //     'main': mainRef,
        // };

        // Ниже идёт серия else if плюс двойная проверка currentTab && currentTab.current &&
        // Они нужны, потому что иначе не получилось победить веру тайпскрипта в то, что currentTab может быть либо null, либо набором из всех типов, встречающихся в этом компоненте

        let currentTab;

        if (tabName === 'bun') {
            currentTab = bunRef;
        }
        else if (tabName === 'sauce') {
            currentTab = sauceRef;
        }
        else if (tabName === 'main') {
            currentTab = mainRef
        }

        currentTab && currentTab.current && currentTab.current.scrollIntoView({ block: "start", behavior: "smooth" });

    }

    const handleTabClick = (value: string): void => {
        setCurrentTab(value);
        scrollIntoRef(value as TTabName); // сделала как в вебинаре, но не понимаю, почему иначе тс капризничает
    };

    const handleScroll = () => {

        // У четырёх перменных ниже используется рернарный оператор. Это нужно, чтобы тайпскрипт не ругался на возможность записи null в переменную
        const scrollContainerPosition = scrollContainerRef.current ? scrollContainerRef.current.getBoundingClientRect().top : 0;
        const bunHeaderPosition = bunRef.current ? bunRef.current.getBoundingClientRect().top : 0;
        const sauceHeaderPosition = sauceRef.current ? sauceRef.current.getBoundingClientRect().top : 0;
        const mainHeaderPosition = mainRef.current ? mainRef.current.getBoundingClientRect().top : 0;
        // console.log("scroll container pos: ", scrollContainerPosition);
        // console.log("bun header pos: ", bunHeaderPosition);
        // console.log("sauce header pos: ", sauceHeaderPosition);
        // console.log("main ingridient header pos: ", mainHeaderPosition);

        // Используем Math.abs, так как число может получиться отрицательное
        const bunDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const sauceDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const mainDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

        if (bunDiff < sauceDiff) {
            setCurrentTab("bun");
        } else if (sauceDiff < mainDiff) {
            setCurrentTab("sauce");
        } else {
            setCurrentTab("main");
        }

    };

    return (
        <section className={ingrStyles.ingridiensContainer}>
            {/* {console.log('Рендерю компонент BurgerIngridients')} */}
            <div className={ingrStyles.tabs}>
                {/* Компонент <Tab /> в функцию из onClick={} в качестве аргумента передаёт не event, а значение пропса value={} */}
                <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>Булки</Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>Начинки</Tab>
            </div>

            <div className={ingrStyles.ingrDisplay + ' mt-10'} ref={scrollContainerRef} onScroll={handleScroll}>

                {/* Булки */}
                <div className={ingrStyles.ingrShowcase} ref={bunRef}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"bun"} />
                    </div>
                </div>

                {/* Соусы */}
                <div className={ingrStyles.ingrShowcase} ref={sauceRef}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"sauce"} />
                    </div>
                </div>

                {/* Начинки */}
                <div className={ingrStyles.ingrShowcase} ref={mainRef}>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <div className={ingrStyles.ingrList}>
                        <CardList type={"main"} />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BurgerIngredients;