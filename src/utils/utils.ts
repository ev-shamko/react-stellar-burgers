import { TIngredientObjData } from './types';

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