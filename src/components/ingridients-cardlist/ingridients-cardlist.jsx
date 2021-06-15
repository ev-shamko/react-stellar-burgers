import React from "react";
import PropTypes from 'prop-types';
import { IngridientsListContext } from '../../services/ingridientsContext';

import IngridientCard from "../ingridient-card/ingrdient-card"

// TODO: переписать в функциональный компонент

// *********  Как работает этот компонет:
// полный список ингридиентов (массив объектов) получаем из стейта
// на его основании рендерим новый массив по типу ингридиента, полученного в пропсе

// <CardList type={"bun"} openModal={this.props.openModal} />
class CardList extends React.Component {

    // Определяем contextType, чтобы получить значение контекста.
    // React найдёт (выше по дереву) ближайший Provider-компонент,
    // предоставляющий этот контекст, и использует его значение.
    static contextType = IngridientsListContext;


    render() {
        const { type } = this.props; // нельзя просто использовать this.props.type

        // создаём новый массив из ингридиентов определённого типа: "bun", "sauce", "main"
        const arrSomeIngridients = this.context.ingridientsState.ingridientsData.filter(function (obj) {
            return obj.type === type;
        });

        return (
            <>
                {
                    arrSomeIngridients.map((obj, index) => {
                        return (
                            <IngridientCard
                                objIngridient={obj}
                                key={obj._id}
                                openModal={this.props.openModal}
                            />
                        )
                    })
                }
            </>
        );
    }
}

CardList.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    openModal: PropTypes.func.isRequired,
};

/*  Пример объекта, содержащегося в массиве с ингридиентами:
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



export default CardList;