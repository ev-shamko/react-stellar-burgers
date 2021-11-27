import React, { useEffect } from "react";
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { blankIngr } from '../../services/reducers/burgerVendor'

import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
} from '../../services/actions/burgerVendor';
import { TIngredientObjData, TIngredientInStore, TDraggableIngr } from '../../utils/types';

type TIngridientCardProps = {
    objIngridient: TIngredientObjData
};

const IngridientCard: React.FC<TIngridientCardProps> = ({ objIngridient }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();

    const [{ outline }, dragRef, dragPreviewImg] = useDrag({
        type: 'ingridient',
        item: objIngridient,

        //добавляет элементу рамку, если элемент в данный момент перетаскивается куда-то
        collect: (monitor) => ({
            outline: monitor.isDragging() ? '1px solid #4C4CFF' : '',
        }),
    });

    const openIngridientDetails = () => {
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

    const handleClick = () => {
        openIngridientDetails();

        // при открытии модального окна с информацией об ингридиенте в адресной строке пропишется уникальный роут ингридиента
        history.push({
            pathname: `/ingredients/${objIngridient._id}`,
            state: { ingredientModal: location }, // в background записался текущий объект location, который будет использоваться в App для изменения содержимого адресной строки
        });
    };


    /******************************************************************** */
    /******      Логика счётчика выбранных ингридиентов        ********* */
    /****************************************************************** */

    // стейт для хранения состояния счетчика на карточке ингридиента
    const [ingrCounter, setIngrCounter] = React.useState<number>();

    // получаем стейт из редакса, из которого можно понять, сколько штук текущего ингридиента положено в конструктор бургера. Какой конкретно стейт нам нужен зависит от ингридиента в пропсах инстанса текущего компонента


    // эта переменная даёт инстансу карточки доступ к ингридиентам в конструкторе бургера:
    // либо к булкам, если это карточка булки
    // либо к списку draggableIngridients, если инстанс карточки относится к начинкам
    // на основании этой переменной определяется, что писать в счётчике выбранных ингредиентов на карточке ингридиента
    const bunInConstructor: TIngredientObjData | undefined = useAppSelector((state) => {
        // если у нас тут карточка булки, то в переменную запишется 1 объект: либо пустой, либо с 1 булк ой
        if (objIngridient.type === 'bun') {
            return state.burgerVendor.bun ;
        }
        return undefined;
    });

    const draggableIngrInConstructor: TDraggableIngr[] | undefined = useAppSelector((state) => {
        // если создаём карточку соуса или начинки, то в переменную запишется массив с объектами ингридиентов, перетащенных в конструктор бургера
        if (objIngridient.type === 'sauce' || objIngridient.type === 'main') {
            return state.burgerVendor.draggableIngridients ;
        }
        return undefined;
    });

    // в зависимости от типа текущего ингридиента функция проверит, сколько таких ингридиентов лежит в соответствующем стейте в редаксе
    function getNumOfIngridients(): number {
        let counterValue = 0;


        // если в стейте лежит именно эта булка, счётчик выставляем на 1, иначе на 0
        // ingrInConstructor будет объектом
        if (objIngridient.type === 'bun') {
            if (bunInConstructor && (bunInConstructor._id === objIngridient._id) ) {
                return 2;
            }
        }

        // если текущий для данного инстанса ингридиент - это соус или начинка, считаем, сколько таких ингридиентов в конструкторе
        if (draggableIngrInConstructor && (objIngridient.type === 'sauce' || objIngridient.type === 'main')) {
            // если находим в массиве такой же _id, как в этом экземпляре карточки, то увеличиваем счётчик на 1
            draggableIngrInConstructor.forEach((item: TIngredientInStore) => {
                if (item._id === objIngridient._id) {
                    counterValue++;
                }
            });
        }

        return counterValue;
    }

    // при каждом изменении стейта в редаксе будет обновляться стейт счетчика ингридиента ingrCounter
    useEffect(() => {
        setIngrCounter(getNumOfIngridients());
        // eslint-disable-next-line
    }, [bunInConstructor, draggableIngrInConstructor, objIngridient]);

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

export default IngridientCard;