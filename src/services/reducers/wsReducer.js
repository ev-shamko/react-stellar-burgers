import {
  WS_OPEN_CONNECTION,
  WS_CONNECTED_SUCCESSFULLY,
  WS_GOT_ORDERS,
  WS_CLOSE_CONNECTION,
  WS_DISCONNECTED_SUCCESSFULLY,
} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  ordersData: []
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTED_SUCCESSFULLY:
      return {
        ...state,
        wsConnected: true
      };
    case WS_GOT_ORDERS:
      return {
        ...state,
        ordersData: action.payload,
      };
      case WS_DISCONNECTED_SUCCESSFULLY:
        return {
          ...state,
          wsConnected: false,
          ordersData: []
        };

    default:
      return state;
  }
};