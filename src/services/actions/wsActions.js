export const WS_OPEN_CONNECTION = 'WS_OPEN_CONNECTIONN'
export const WS_CONNECTED_SUCCESSFULLY = 'WS_CONNECTED_SUCCESSFULLY';
export const WS_GOT_ORDERS = 'WS_GOT_ORDERS';
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION';
export const WS_DISCONNECTED_SUCCESSFULLY = 'WS_CONNECTED_SUCCESSFULLY';



export const wsActions = {
  openConnection: WS_OPEN_CONNECTION,
  onOpen: WS_CONNECTED_SUCCESSFULLY,
  onGotOrders: WS_GOT_ORDERS,
  closeConnection: WS_CLOSE_CONNECTION,
  onClose: WS_DISCONNECTED_SUCCESSFULLY,
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTED_SUCCESSFULLY
  };
};

export const wsGotOrders = () => {
  return {
    type: WS_GOT_ORDERS
  };
};

// export const wsConnectionClosed = () => {
//   return {
//     type: WS_CONNECTION_CLOSED
//   };
// };