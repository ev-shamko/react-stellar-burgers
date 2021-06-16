import React from "react";
import PropTypes from 'prop-types';
import { IngridientsListContext } from '../../services/ingridientsContext';

import IngridientCard from "../ingridient-card/ingrdient-card"

// TODO: переписать в функциональный компонент. Или мб оставить классовый, чтобы был пример перед глазами?

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

export default CardList;