// типы, используемые в разных компонентах

export type TIngridientType = 'bun' | 'sauce' | 'main';

export type TIngridientObjData = {
  _id: string;
  name: string;
  type: TIngridientType;
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

// это типизация объектов draggableIngridients в store (те ингридиенты, которые перетащены в конструктор, кроме булки. Каждый объект имеет уникальный instanceID, генерируемый на основании .getTime())
export type TIngridientInStore = TIngridientObjData & { instanceID: number }

export type TFindIngridientInStore = (targetIngrID: number) => {
  objIngrData: TIngridientInStore,
  ingrIndexInStore: number,
};

export type TResortIngrList = (dragID: number, dropID: number) => void;