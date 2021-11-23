// типы, переиспользуемые в разных компонентах

import { type } from "os";

export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TProfileMenuTabsValue = 'profile' | 'orderHistory' | 'logOut';
export type TModalType = 'none' | 'IngridientDetails' | 'OrderDetails' | 'OrderCard';

export type TIngredientObjData = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TDraggableIngr = TIngredientObjData & {
  instanceID: number
}



// это типизация объектов draggableIngredients в store (те ингридиенты, которые перетащены в конструктор, кроме булки. Каждый объект имеет уникальный instanceID, генерируемый на основании .getTime())
export type TIngredientInStore = TIngredientObjData & { instanceID: number }

export type TFindIngredientInStore = (targetIngrID: number) => {
  objIngrData: TIngredientInStore,
  ingrIndexInStore: number,
};

export type TResortIngrList = (dragID: number, dropID: number) => void;

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: 'status' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TUserForm = {
  email: string,
  name: string,
  password: string,
}

export type TLoginForm = {
  email: string,
  password: string,
}


export type TOrderData = {
  success: boolean,
  name: string,
  order: {
    number: string,
  }
}

export type TIngrData = {
  arrOfIngridients: Array<TIngredientObjData>,
  ingrDataIsLoading: boolean,
  ingrDataHasError: boolean,
}