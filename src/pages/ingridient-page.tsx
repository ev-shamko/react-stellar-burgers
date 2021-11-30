import { useParams } from "react-router-dom";
import { useAppSelector } from '../services/hooks';
import IngredientDetais from '../components/ingridient-details/ingridient-details';
import { TIngredientObjData } from '../utils/types';


export function IngridientPage() {
  const { id } = useParams<{ id?: string }>();

  const { arrOfIngridients } = useAppSelector((store) => store.burgerVendor.ingridientsData); // TODO: в следующем спринте типировать конкретнее

  // Пока массив ингредиентов запрашивается в шапке приложения, можно здесь этот запрос не дублировать
  //@ts-ignore
  // React.useEffect(() => dispatch(getIngridientsDataThunk(urlApiGetIngridients)), [dispatch]);

  const ingridientProp = arrOfIngridients.find((ingr: TIngredientObjData) => ingr._id === id);

  // на момент первого рендера ingridientProp это [], а в <IngridientDetais> нельзя пробрасывать такой пропс, так что вернём null
  if (!ingridientProp) {
    return null;
  }

  return (
    <div style={{ paddingTop: 80, }}>
      <IngredientDetais ingredientData={ingridientProp} />
    </div>
  );
}