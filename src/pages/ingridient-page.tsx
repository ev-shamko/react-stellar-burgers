import React from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../services/hooks';
import IngredientDetais from '../components/ingridient-details/ingridient-details';
import { TIngredientObjData } from '../utils/types';


import {
  getIngridientsDataThunk,
} from '../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../utils/api-url';

export function IngridientPage() {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();

  const { arrOfIngridients } = useAppSelector((store) => store.burgerVendor.ingridientsData); // TODO: в следующем спринте типировать конкретнее

  // запрашиваем у сервера массив ингридиентов. 
  // Поскольку переход на данную страницу возможен только по прямой ссылке /ingredients/:id, store будет дефолтным, и нам всегда нужно получить массив ингридиентов для отображения конкретного ингридиента
  // Пока массив ингредиентов запрашивается в шапке приложения, можно здесь не дублировать
  //@ts-ignore
  // React.useEffect(() => dispatch(getIngridientsDataThunk(urlApiGetIngridients)), [dispatch]);

  const ingridientProp = arrOfIngridients.find((ingr: TIngredientObjData) => ingr._id === id);

  // на момент первого рендера ingridientProp это [], а в <IngridientDetais> нельзя пробрасывать такой пропс, так что вернём null
  if (!ingridientProp) {
    return null;
  }

  return (
    <div style={{paddingTop: 80,}}>
      <IngredientDetais ingredientData={ingridientProp} />
    </div>
  );
}