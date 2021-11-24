import {
  WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  WS_ERROR, // возникла ошибка
  WS_GOT_ORDERS, // когда пришли данные о заказах
  WS_DISCONNECTED, // ws статус переменился на CLOSED
  SET_DETAILED_ORDER_IN_MODAL, // устанавливает данные заказа для отображения в модальном окне
  TwsActionsUnion // 
} from '../actions/wsActions';
import { TOrder } from '../../utils/types';

// const initialState = {
//   wsConnected: false,
//   wsError: false,
//   ordersData: []
// };


export type TOrdersStoreData = {
  success: null | boolean,
  orders: ReadonlyArray<TOrder>,
  total: number,
  totalToday: number,
}

export type TwsState = {
  wsConnected: boolean,
  wsError: boolean,
  ordersData: TOrdersStoreData,
  detailedOrder: TOrder,
}


const initialState: TwsState = {
  wsConnected: false,
  wsError: false,
  ordersData: {
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  detailedOrder: {
    ingredients: [],
    _id: '',
    status: 'pending',
    number: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
  },
};

export const wsReducer = (state = initialState, action: TwsActionsUnion): TwsState => {
  switch (action.type) {
    case WS_CONNECTED_SUCCESSFULLY:
      return {
        ...state,
        wsConnected: true,
        wsError: false, // если добавить на страницу кнопку переподключения, пригодится
      };
    case WS_GOT_ORDERS:
      return {
        ...state,
        ordersData: action.ordersData,
      };
    case WS_DISCONNECTED:
      return {
        ...state,
        wsConnected: false,
        ordersData: initialState.ordersData // предпочитаю обнулить данные о заказах, чтобы при переходе на разные фиды там не отображались поначалу данные из предыдущего фида
      };
    case WS_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      }
    case SET_DETAILED_ORDER_IN_MODAL:
      return {
        ...state,
        detailedOrder: action.orderData,
      }

    default:
      return state;
  }
};