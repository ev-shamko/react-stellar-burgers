import React from "react";
import PropTypes from 'prop-types';

import IngridientCard from "../ingridient-card/ingrdient-card"


// <CardList type={"bun"} ingridients={this.props.allIngridients} openModal={this.props.openModal} />
class CardList extends React.Component {
    render() {
        const { type } = this.props; // нельзя просто использовать this.props.type

        // создаём новый массив из ингридиентов определённого типа: "bun", "sauce", "main"
        const arrSomeIngridients = this.props.ingridients.filter(function (obj) {
            return obj.type === type;
        });

        return (
            <>
                {
                    arrSomeIngridients.map((obj, index) => {
                        return (
                            <IngridientCard
                                key={obj._id}
                                image={obj.image}
                                price={obj.price}
                                name={obj.name}
                                openModal={this.props.openModal}
                            />
                        )
                    })
                }
            </>
        );
    }
}

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

CardList.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    ingridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired) // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
}

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