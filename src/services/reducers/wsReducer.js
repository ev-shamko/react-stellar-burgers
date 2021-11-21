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
    orders: [ // TODO: здесь подробный initialstate зря, при рефакторинге убрать и добавить нормальные предохранители при рендеринге эленментов карточек
      // {
      //   _id: "619a2a6019cb95001bc35bed",
      //   ingredients: ["60d3b41abdacab0026a733c7"],
      //   status: 'pending',
      //   name: "Краторный бургер",
      //   createdAt: '2021-11-21T11:15:44.544Z',
      //   updatedAt: '2021-11-21T11:15:44.544Z',
      //   number: 1234,
      // },
    ],
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