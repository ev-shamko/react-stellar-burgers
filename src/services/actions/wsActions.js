export const WS_OPEN_CONNECTION = 'WS_OPEN_CONNECTIONN';
export const WS_CONNECTED_SUCCESSFULLY = 'WS_CONNECTED_SUCCESSFULLY';
export const WS_ERROR = 'WS_ERROR';
export const WS_GOT_ORDERS = 'WS_GOT_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION';
export const WS_DISCONNECTED = 'WS_DISCONNECTED';



export const wsActions = {
  openConnection: WS_OPEN_CONNECTION, // для отправки запроса на установлениe ws
  onOpen: WS_CONNECTED_SUCCESSFULLY, // соединение успешно открылось
  onError: WS_ERROR, // возникла ошибка
  onGotOrders: WS_GOT_ORDERS, // когда пришли данные о заказах
  sendMessage: WS_SEND_MESSAGE, // отправка заказа на сервер
  closeConnection: WS_CLOSE_CONNECTION, // экшн для отправки запроса на закрытие ws
  onClose: WS_DISCONNECTED, // ws статус переменился на CLOSED
};


// Эти функции называются action creator - они нужны что бы не писать каждый раз создание объекта, а просто вызывать функцию, которая возвращает нужные объект экшена
// Мне и без них норм, но пусть пока тут лежат, мб позже оценю их прелесть

// export const wsConnectionSuccess = () => {
//   return {
//     type: WS_CONNECTED_SUCCESSFULLY
//   };
// };

// export const wsGotOrders = () => {
//   return {
//     type: WS_GOT_ORDERS
//   };
// };

// export const wsConnectionClosed = () => {
//   return {
//     type: WS_CONNECTION_CLOSED
//   };
// };