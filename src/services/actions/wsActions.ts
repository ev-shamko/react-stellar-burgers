import { TOrder } from '../../utils/types';
import { TOrdersStoreData } from '../reducers/wsReducer';

export const WS_OPEN_CONNECTION: 'WS_OPEN_CONNECTION' = 'WS_OPEN_CONNECTION';
export const WS_CONNECTED_SUCCESSFULLY: 'WS_CONNECTED_SUCCESSFULLY' = 'WS_CONNECTED_SUCCESSFULLY';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_GOT_ORDERS: 'WS_GOT_ORDERS' = 'WS_GOT_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CLOSE_CONNECTION: 'WS_CLOSE_CONNECTION' = 'WS_CLOSE_CONNECTION';
export const WS_DISCONNECTED: 'WS_DISCONNECTED' = 'WS_DISCONNECTED';

export const wsActions = {
  openConnection: WS_OPEN_CONNECTION, // для отправки запроса на установлениe ws
  onOpen: WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  onError: WS_ERROR, // возникла ошибка
  onGotOrders: WS_GOT_ORDERS, // когда пришли данные о заказах
  sendMessage: WS_SEND_MESSAGE, // отправка заказа на сервер
  closeConnection: WS_CLOSE_CONNECTION, // экшн для отправки запроса на закрытие ws
  onClose: WS_DISCONNECTED, // ws статус переменился на CLOSED
};

export type TwsActions = {
  openConnection: typeof WS_OPEN_CONNECTION, // для отправки запроса на установлениe ws
  onOpen: typeof WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  onError: typeof WS_ERROR, // возникла ошибка
  onGotOrders: typeof WS_GOT_ORDERS, // когда пришли данные о заказах
  sendMessage: typeof WS_SEND_MESSAGE, // отправка заказа на сервер
  closeConnection: typeof WS_CLOSE_CONNECTION, // экшн для отправки запроса на закрытие ws
  onClose: typeof WS_DISCONNECTED, // ws статус переменился на CLOSED
};



// типизация для редьюсера и для генератора экшена
export interface IopenConnectionAction {
  readonly type: typeof WS_OPEN_CONNECTION;
}

// Эти функции называются action creator - они нужны что бы не писать каждый раз создание объекта, а просто вызывать функцию, которая возвращает нужные объект экшена
// Мне и без них норм, но пусть пока тут лежат, мб позже оценю их прелесть
export const openConnectionAction = (): IopenConnectionAction => {
  return {
    type: WS_OPEN_CONNECTION
  };
};

// *****

export interface IonOpenAction {
  readonly type: typeof WS_CONNECTED_SUCCESSFULLY;
}

export const onOpenAction = (): IonOpenAction => {
  return {
    type: WS_CONNECTED_SUCCESSFULLY
  };
}

// *****

export interface IonErrorAction {
  readonly type: typeof WS_ERROR;
}

export const onErrorAction = (): IonErrorAction => {
  return {
    type: WS_ERROR
  };
}

// *****

export interface IonGotOrdersAction {
  readonly type: typeof WS_GOT_ORDERS;
  readonly ordersData: TOrdersStoreData;
}

export const onGotOrdersAction = (ordersData: TOrdersStoreData): IonGotOrdersAction => {
  return {
    type: WS_GOT_ORDERS,
    ordersData,
  };
}

// *****

export interface IsendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string,
  
}

export const sendMessageAction = (message: string): IsendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
}

// *****

export interface IcloseConnectionAction {
  readonly type: typeof WS_CLOSE_CONNECTION;
}

export const closeConnectionAction = (): IcloseConnectionAction => {
  return {
    type: WS_CLOSE_CONNECTION
  };
}

// *****

export interface IonCloseAction {
  readonly type: typeof WS_DISCONNECTED;
}

export const onCloseAction = (): IonCloseAction => {
  return {
    type: WS_DISCONNECTED
  };
}

// это union-тип, объединяющий в себе все типы экшенов
export type TwsActionsUnion = IopenConnectionAction | IonOpenAction | IonErrorAction | IonGotOrdersAction | IsendMessageAction | IcloseConnectionAction | IcloseConnectionAction | IonCloseAction;