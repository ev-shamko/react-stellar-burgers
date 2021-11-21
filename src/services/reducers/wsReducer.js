import {
  WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  WS_ERROR, // возникла ошибка
  WS_GOT_ORDERS, // когда пришли данные о заказах
  WS_SEND_MESSAGE, // отправка заказа на сервер
  WS_DISCONNECTED, // ws статус переменился на CLOSED
} from '../actions/wsActions';

// const initialState = {
//   wsConnected: false,
//   wsError: false,
//   ordersData: []
// };

const initialState = {
  wsConnected: false,
  wsError: false,
  ordersData: {
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
  }
};

export const wsReducer = (state = initialState, action) => {
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
        ordersData: action.payload,
      };
    case WS_DISCONNECTED:
      return {
        ...state,
        wsConnected: false,
        ordersData: []
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