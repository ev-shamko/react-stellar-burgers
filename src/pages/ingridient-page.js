import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import IngridientDetais from '../components/ingridient-details/ingridient-details';


import {
  getIngridientsData,
} from '../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../utils/api-url';

export function IngridientPage() {
  let { id } = useParams();
  const dispatch = useDispatch();

  const { arrOfIngridients } = useSelector(store => store.burgerVendor.ingridientsData);

  // запрашиваем у сервера массив ингридиентов. 
  // Поскольку переход на данную страницу возможен только по прямой ссылке /ingredients/:id, store будет дефолтным, и нам всегда нужно получить массив ингридиентов для отображения конкретного ингридиента
  React.useEffect(() => dispatch(getIngridientsData(urlApiGetIngridients)), [dispatch]);

  let ingridientProp = arrOfIngridients.find(ingr => ingr._id === id);

  // на момент первого рендера ingridientProp это [], а в <IngridientDetais> нельзя пробрасывать такой пропс, так что вернём null
  if (!ingridientProp) {
    return null;
  }

  return (
    // <div>Йа ингридиент {`${ingridientProp}`}</div>
    <IngridientDetais ingredientData={ingridientProp} />
  );
}