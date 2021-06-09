import React from 'react';
import stylesID from './ingridient-details.module.css';
import PropTypes from 'prop-types';

function IngridientDetais({ingrInModalData}) {
    return (
        <>
            <h2 className={stylesID.modalHeader + ' text  text_type_main-large mt-10 ml-10 mb-3'}>Детали ингредиента</h2>
            <img src={ingrInModalData['image_large']} alt={ingrInModalData['name']} className={stylesID.ingrImage + ' mb-4'} />
            <p className={'text  text_type_main-medium mb-4'}>{ingrInModalData['name']}</p>

            <ul className={stylesID.ingrInfo}>
                <li className={stylesID.nutrient}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Калории,ккал</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrInModalData['calories']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Белки, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrInModalData['proteins']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Жиры, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrInModalData['fat']}</p>
                </li>
                <li className={stylesID.nutrient + ' text  text_type_main-default text_color_inactive'}>
                    <h5 className={stylesID.nutrientHeader + ' text  text_type_main-default text_color_inactive'}>Углеводы, г</h5>
                    <p className={stylesID.nutrientValue + ' text text_type_digits-default  text_color_inactive'}>{ingrInModalData['carbohydrates']}</p>
                </li>
            </ul>
            <p></p>
            <p></p>
        </>
    )
}

IngridientDetais.propTypes = {
    ingrInModalData: PropTypes.object.isRequired,
};

export default IngridientDetais;