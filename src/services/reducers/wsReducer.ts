import {
  WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  WS_ERROR, // возникла ошибка
  WS_GOT_ORDERS, // когда пришли данные о заказах
  WS_DISCONNECTED, // ws статус переменился на CLOSED
  TwsActions // 
} from '../actions/wsActions';
import { TOrder } from '../../utils/types';

// const initialState = {
//   wsConnected: false,
//   wsError: false,
//   ordersData: []
// };

export type TwsState = {
  wsConnected: boolean,
  wsError: boolean,
  ordersData: TOrdersStoreData,
  //   {
  //     success: null | boolean,
  //     orders: ReadonlyArray<TOrder>,
  //     total: number,
  //     totalToday: number,
  // }
}

export type TOrdersStoreData = {
    success: null | boolean,
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
}

const initialState: TwsState = {
  wsConnected: false,
  wsError: false,
  ordersData: {
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
  }
};

export const wsReducer = (state = initialState, action: TwsActions): TwsState => {
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
        // ordersData: []
      };
    case WS_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      }

    default:
      return state;
  }
};