import { TIngredientObjData, TOrder } from './types';

export const getOrderStatus = (orderStatus: string): string => {
  switch (orderStatus) {
    case ('done'): {
      return 'Выполнен';
    }
    case ('pending'): {
      return 'Готовится';
    }
    default: return 'Отменён'
  }
}

export const getPrice = (arr: Array<TIngredientObjData>) => {
  return arr.reduce((previousValue: number, currentValue: TIngredientObjData) => {
    return previousValue + currentValue.price;
  }, 0);
}

// берем массив id ингридиентов из заказа. На его основании собираем полноценный массив ингридиентов. Потом из него можно посчитать стоимость заказа
export const getCompletedIngrList = (orderData: TOrder, allIngrCatalog: Array<TIngredientObjData>): Array<TIngredientObjData> => {
  const completedIngrList: Array<TIngredientObjData> = [];


  for (const ingrId of orderData.ingredients) {
    allIngrCatalog.forEach((ingrObj) => {
      if (ingrObj._id === ingrId) {
        completedIngrList.push(ingrObj)
      }
    })
  }

  return completedIngrList;
}