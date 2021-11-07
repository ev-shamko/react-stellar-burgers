// типы, используемые в разных компонентах

export type TIngredientType = 'bun' | 'sauce' | 'main';

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

// это типизация объектов draggableIngredients в store (те ингридиенты, которые перетащены в конструктор, кроме булки. Каждый объект имеет уникальный instanceID, генерируемый на основании .getTime())
export type TIngredientInStore = TIngredientObjData & { instanceID: number }

export type TFindIngredientInStore = (targetIngrID: number) => {
  objIngrData: TIngredientInStore,
  ingrIndexInStore: number,
};

export type TResortIngrList = (dragID: number, dropID: number) => void;