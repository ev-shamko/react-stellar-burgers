import { format, differenceInDays, formatDistance } from "date-fns";
// import {  isToday, isYesterday, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { TIngredientObjData, TOrder } from './types';

export const getInstanceID = () => {return (new Date()).getTime()};

export const getFormattedDate = (data: string) => {
  const currentDate = new Date();
  const pastDate = new Date(data);

  const formatedTime =
    format(pastDate, 'HH:mm ') + 'i-' + format(pastDate, 'O'); // https://date-fns.org/v2.26.0/docs/format

  const diffDays = differenceInDays(currentDate.getTime(), pastDate.getTime());

  let calendarDate = '';
  if (diffDays === 0) {
    calendarDate = 'Сегодня';
  } else if (diffDays === 1) {
    calendarDate = 'Вчера';
  } else if (diffDays < 5) {
    calendarDate = `${diffDays} дня назад`;
  } else if (diffDays < 20) {
    calendarDate = `${diffDays} дней назад`;
  } else {
    calendarDate = `${formatDistance(new Date(pastDate), Date.now(), { locale: ru })} назад`;
  }

  const res = `${calendarDate}, ${formatedTime}`;
  return res;
};

// Предложение от наставника, прикольное:
// export function formatOrderCreationDate (date) {
//   if (isToday(date)) {
//     return `Сегодня, ${format(date, "kk:mm", { locale: ru })}`;
//   }

//   if (isYesterday(date)) {
//     return `Вчера, ${format(date, "kk:mm", { locale: ru })}`;
//   }

//   return `${formatDistance(new Date(date), Date.now(), { locale: ru })} назад`;
// }


// неплохо, но чтобы получать форматирование даты как в макете, лучше использую date-fns
// const getTime = (createdAt: string) => {
//   const parseDate = new Date(Date.parse(createdAt));

//   const options: any = { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
//   const formatedTime = new Intl.DateTimeFormat('ru-RU', options).format(parseDate);

//   return formatedTime;
// }

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