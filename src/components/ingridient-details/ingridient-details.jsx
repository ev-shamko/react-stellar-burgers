import React from 'react';
import stylesID from './ingridient-details.module.css';
import PropTypes from 'prop-types';

const ingrData = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
}

function IngridientDetais() {
    return (
        <>
            <h2 className={stylesID.modalHeader + ' text  text_type_main-large mt-10 ml-10 mb-3'}>Детали ингредиента</h2>
            <img src={ingrData['image_large']} alt={ingrData['name']} className={stylesID.ingrImage + ' mb-4'} />
            <p className={'text  text_type_main-medium mb-4'}>{ingrData['name']}</p>

            <ul className={stylesID.ingrInfo}>
                <li className={stylesID.nutrient}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Калории,ккал</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrData['calories']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Белки, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrData['proteins']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Жиры, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrData['fat']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Углеводы, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrData['carbohydrates']}</p>
                </li>
            </ul>
            <p></p>
            <p></p>
        </>
    )
}

export default IngridientDetais;