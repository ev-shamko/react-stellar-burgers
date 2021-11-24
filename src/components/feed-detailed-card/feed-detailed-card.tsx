import s from './feed-detailed-card.module.css';
import { appUseSelector } from '../../services/hooks';
import { wsActions } from '../../services/actions/wsActions';
import { getOrderStatus, getPrice } from '../../utils/utils';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, TIngredientObjData } from '../../utils/types';




export const FeedDetailedCard = () => {
  const orderData = appUseSelector(store => store.ws.detailedOrder);
  const allIngredientsData = appUseSelector((state) => state.burgerVendor.ingridientsData.arrOfIngridients);

  // собираем массив с данными об используемых ингридиентах
  let arrOfUsedIngr: null | Array<TIngredientObjData> = null;
  let bunItem: null | TIngredientObjData = null;
  let restIngr: null | Array<TIngredientObjData> = null;

  if (allIngredientsData && orderData) {
    
    arrOfUsedIngr = allIngredientsData.filter((ingr: TIngredientObjData) => orderData.ingredients.includes(ingr._id));

    restIngr = allIngredientsData.filter((ingr: TIngredientObjData) => orderData.ingredients.includes(ingr._id));


    bunItem = restIngr[0];
    restIngr = restIngr.slice(1,);

    //TODO: сделать в arrOfUsedIngr схлопывание повторяющихся ингридиентов, изменить структуру объекта (добавить поле с количеством повторений ингридиента), переписать getListItem() под новую структуру
  }

  // вернёт круглую картинку ингредиента
  const getIcon = (url: string) => {
    return (<div className={s.imgContainer} style={{ backgroundImage: `url(${url})` }}></div>)
  }

  const getListItem = (ingrObj: TIngredientObjData | null, amount: number = 1) => {

    return (
      ingrObj ?
        (
          <li className={s.ingrItem}>
            <div className={s.ingrIdent}>
              {getIcon(ingrObj.image_mobile)}
              <span className={' text text_type_main-default'}>{ingrObj.name}</span>
            </div>
            <div className={s.priceContainer}>
              <span className={s.ingrPrice + ' text text_type_digits-default'}>{amount} x {ingrObj.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        )
        :
        null
    )
  }

  return (
    <article className={s.main}>
      <span className={s.number + ' text text_type_digits-default mb-10'}> {orderData.number} </span>
      <h4 className={s.header + ' text text_type_main-medium mb-2'}> {orderData.name} </h4>
      <span className={s.status + ' text text_type_main-default mb-15'}>{getOrderStatus(orderData.status)}</span>

      <h5 className={s + ' text text_type_main-medium mb-6'}>Состав:</h5>

      <ul className={s.ingrList}>
        {/* Булка */}
        {bunItem ? getListItem(bunItem, 2) : null}

        {/* Остальные ингредиенты */}
        {restIngr ? restIngr.map(ingr => getListItem(ingr, 1)) : null}
      </ul>

      <div className={s.plane}>
        <span className={' text text_type_main-default text_color_inactive'}>сегодня, 13:50 i-GMT+3{/*getTime(orderData.createdAt)*/}</span>

        <div className={s.price}><span className={' text text_type_digits-default mr-2'}>
          { arrOfUsedIngr ? ( getPrice(arrOfUsedIngr) ) : null}
          </span><CurrencyIcon type="primary" /></div>
      </div>
    </article>
  )
}