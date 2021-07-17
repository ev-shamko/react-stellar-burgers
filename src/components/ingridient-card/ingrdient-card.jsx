import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";

import { useDispatch, useSelector } from 'react-redux';
import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
} from '../../services/actions/burgerVendor';

/* <IngridientCard
        objIngridient={obj}
        key={obj._id}
    />
*/

// @ts-ignore
const IngridientCard = ({ objIngridient }) => {
    const dispatch = useDispatch();

    const [{ outline }, dragRef, dragPreviewImg] = useDrag({
        type: 'ingridient',
        item: objIngridient,

        //добавляет элементу рамку, если элемент является перетаскиваемым
        // если переписать, может иначе влиять на стили элемента, или вообще стать условием, при котором элемент отображается/пропадает (return (!isDrag && <div><div>)
        collect: (monitor) => ({
            outline: monitor.isDragging() ? '1px solid #4C4CFF' : '',
        }),
    });

    const openIngridientDetails = (event) => {
        dispatch({
            type: OPEN_MODAL,
        });
        dispatch({
            type: SET_MODAL_TYPE,
            value: 'IngridientDetails',
        });
        dispatch({
            type: SET_INGRIDIENT_IN_MODAL,
            value: objIngridient,
        });
    };

    const handleClick = (event) => {
        openIngridientDetails(event);
    };


    /******************************************************************** */
    /******      Логика счётчика выбранных ингридиентов        ********* */
    /****************************************************************** */

    // стейт для хранения состояния счетчика на карточке ингридиента
    const [ingrCounter, setIngrCounter] = React.useState();

    // TODO попробовать объявлять 1 стейт
    // счетчику нужны данные о том, сколько экземпляров ингридиента лежит в констукторе
    // if (true) {
    const { stateBun, stateDraggableIngridients } = useSelector(state => ({
        stateBun: state.burgerVendor.bun,
        stateDraggableIngridients: state.burgerVendor.draggableIngridients,
    }));
    // }

    // записываем в переменую стейт из редакса, из которого можно понять, сколько штук текущего ингридиента положено в конструктор бургера
    const { ingrInConstructor } = useSelector(state => {
        // тут в переменную запишется 1 объект: либо пустой, либо с 1 булкой
        if (objIngridient.type === 'bun') {
            return ({ ingrInConstructor: state.burgerVendor.bun });
        }
        // тут в переменную запишется массив с объектами ингридиентов
        // ??? это точно массив, но почему он не итерируется через forEach ?
        if (objIngridient.type === 'sauce' || 'main') {
            return ({ ingrInConstructor: state.burgerVendor.draggableIngridients });
        }
    })

    // console.log(`Type of ingridietn ${objIngridient.type}. The ingrInConstructor is ${ingrInConstructor}`);
    // console.log(ingrInConstructor);

    // в зависимости от типа текущего ингридиента функция проверит, сколько таких ингридиентов лежит в соответствующем стейте в редаксе
    function getNumOfIngridients() {
        let counterValue = 0;

        // если в стейте лежит именно эта булка, счётчик выставляем на 1, иначе на 0
        // ingrInConstructor будет объектом
        if (objIngridient.type === 'bun') {
            if (ingrInConstructor._id === objIngridient._id) {
                return ++counterValue;
            }
        }

        // если текущий для данного инстанса ингридиент - это соус или начинка, считаем, сколько таких ингридиентов в конструкторе
        // ingrInConstructor будет массивом объектов
        if (objIngridient.type === 'sauce' || 'main') {
            // если находим в массиве такой же _id, как в этом экземпляре карточки, то увеличиваем счётчик на 1
            ingrInConstructor.forEach((item) => {
                console.log('got sauce or main');
                console.log('ingrInConstructor', ingrInConstructor)
                console.log('array ia array results', Array.isArray(ingrInConstructor))

                if (item._id === objIngridient._id) {
                    counterValue++;
                }
            });
        }

        return counterValue;
    }

    // передаёт в useEffect только один стейт, чтобы не абсолютно все карточки ингридиентов ререндерились при изменении стейта
    // function getCondition() {
    //     if (objIngridient.type === 'bun') {
    //         return [stateBun];
    //     }

    //     if (objIngridient.type === 'sauce' || 'main') {
    //         return [stateDraggableIngridients];
    //     }
    // }

    // при каждом изменении стейта в редаксе будет обновляться стейт счетчика ингридиента ingrCounter
    useEffect(() => {
        console.log('useEffect in ingridient card');
        setIngrCounter(getNumOfIngridients());
    }, [ingrInConstructor]);
    // getCondition()

    /**************************************************** */

    return (
        <>
            <DragPreviewImage connect={dragPreviewImg} src={objIngridient.image} /> {/* При перетаскивании будет показываться только картинка, а не вся карточка ингридиента */}
            <div className={cardStyles.ingrCard + ' mb-8'} onClick={handleClick} ref={dragRef} style={{ outline }}>
                <img src={objIngridient.image} alt={objIngridient.name} className={cardStyles.itemPic} />
                <div className={cardStyles.price}>
                    {/* Если данный ингридиент ни разу не был перетащен в конструктор, счетчик не будет отображаться. Так красивее и не противоречит тз */}
                    {!!ingrCounter && <Counter count={ingrCounter} size="default" />}
                    <span className="m-2 text_type_digits-default">{objIngridient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className="m-1 text_type_main-default">{objIngridient.name}</h3>
            </div>
        </>
    );
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

IngridientCard.propTypes = {
    objIngridient: PropTypes.shape(ingridientsInnerObjStructure.isRequired),
}

export default IngridientCard;