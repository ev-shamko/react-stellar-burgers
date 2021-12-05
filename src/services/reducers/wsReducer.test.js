import {
  WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  WS_ERROR, // возникла ошибка
  WS_GOT_ORDERS, // когда пришли данные о заказах
  WS_DISCONNECTED, // ws статус переменился на CLOSED
  SET_DETAILED_ORDER_IN_MODAL, // устанавливает данные заказа для отображения в модальном окне
} from '../actions/wsActions';

import { wsReducer, wsInitialState } from './wsReducer';

const objConnectionEstablished = {
  wsConnected: true,
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
}

const isConnectedHasOrders = {
  wsConnected: true,
  wsError: false,
  ordersData: {
    success: true,
    orders: [{ _id: '12qw' }, { _id: '55zx' }],
    total: 5,
    totalToday: 2,
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
}

describe('websocket reducer', () => {
  it('should return initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(wsInitialState)
  });

  it('should handle WS_CONNECTED_SUCCESSFULLY', () => {
    expect(wsReducer(wsInitialState, {
      type: WS_CONNECTED_SUCCESSFULLY,
    })).toEqual(objConnectionEstablished);
  });

  it('should handle WS_GOT_ORDERS', () => {
    expect(wsReducer(objConnectionEstablished, {
      type: WS_GOT_ORDERS,
      ordersData: { // сюда записывается новый объект
        success: true,
        orders: [{ _id: '12qw' }, { _id: '55zx' }],
        total: 5,
        totalToday: 2,
      }
    })).toEqual(
      {
        wsConnected: true,
        wsError: false,
        ordersData: {
          success: true,
          orders: [{ _id: '12qw' }, { _id: '55zx' }],
          total: 5,
          totalToday: 2,
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
      }
    );
  });

  it('should handle WS_ERROR', () => {
    expect(wsReducer(isConnectedHasOrders, {
      type: WS_ERROR,
    })).toEqual({
      wsConnected: false, // тут изменения
      wsError: true, // тут изменения
      ordersData: {
        success: true,
        orders: [{ _id: '12qw' }, { _id: '55zx' }],
        total: 5,
        totalToday: 2,
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
    });
  });

  it('should handle WS_DISCONNECTED', () => {
    expect(wsReducer(isConnectedHasOrders, {
      type: WS_DISCONNECTED,
    })).toEqual({
      wsConnected: false, // тут изменения
      wsError: false,
      ordersData: {
        success: true,
        orders: [{ _id: '12qw' }, { _id: '55zx' }],
        total: 5,
        totalToday: 2,
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
    });
  });

  it('should handle SET_DETAILED_ORDER_IN_MODAL', () => {
    expect(wsReducer(isConnectedHasOrders, {
      type: SET_DETAILED_ORDER_IN_MODAL,
      orderData: {
        ingredients: ['123qwe', '456zxc'],
        _id: '000',
        status: 'done',
        number: 123456,
        createdAt: '2021-12-05T03:40:06.375Z',
        updatedAt: '2021-12-05T03:40:06.627Z',
        name: 'Test Order',
      },
    })).toEqual({
      wsConnected: true,
      wsError: false,
      ordersData: {
        success: true,
        orders: [{ _id: '12qw' }, { _id: '55zx' }],
        total: 5,
        totalToday: 2,
      },
      detailedOrder: { // вот сюда записывается объект с данными
        ingredients: ['123qwe', '456zxc'],
        _id: '000',
        status: 'done',
        number: 123456,
        createdAt: '2021-12-05T03:40:06.375Z',
        updatedAt: '2021-12-05T03:40:06.627Z',
        name: 'Test Order',
      },
    });
  });

});