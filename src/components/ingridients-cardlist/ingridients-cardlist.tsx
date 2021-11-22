import React from "react";
import IngridientCard from "../ingridient-card/ingrdient-card";
import { TIngredientObjData, TIngredientType } from '../../utils/types';

import { appUseSelector } from '../../services/hooks';


// *********  Как работает этот компонет:
// получаем из стейта полный список ингридиентов (массив объектов)
// на его основании рендерим новый массив по типу ингридиента, полученного в пропсе

type TCardListProps = { type: TIngredientType };

const CardList: React.FC<TCardListProps> = ({ type }) => {

    //const { ingridientsState } = React.useContext(IngridientsListContext);
    const arrOfIngridients = appUseSelector((store) => store.burgerVendor.ingridientsData.arrOfIngridients); // TODO: в этом спринте типируем : any
    
    // из массива всех ингридиентов выбираем ингридиенты определённого типа (например, только булки: obj.type === 'bun')
    const arrTargetedIngridients = arrOfIngridients.filter(function (obj: TIngredientObjData) {
        return obj.type === type;
    });

    return (
        <>
            {
                arrTargetedIngridients.map((obj: TIngredientObjData, index: number) => {
                    return (
                        <IngridientCard
                            objIngridient={obj}
                            key={obj._id}                            
                        />
                    )
                })
            }
        </>
    );
}

export default CardList;