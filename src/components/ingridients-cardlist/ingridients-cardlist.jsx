import React from "react";
//import ingrStyles from "./ingridients-cardlist.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card"


// <CardList type={"bun"} ingridients={this.props.allIngridients} />

class CardList extends React.Component {
    render(props) {
        const { type, ingridients } = this.props; // нельзя просто использовать this.props.type

        // создаём новый массив из ингридиентов определённого типа
        const arrSomeIngridients = this.props.ingridients.filter(function (obj) {
            // {console.log(ingridients)}
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
                            />
                        )
                    })
                }
            </>
        );
    }
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