

/* 
Всю логику взаимодействия с WebSocket разместим внутри мидлвара, что позволит разделить зоны ответственности частей приложения и сделать код более читабельным и поддерживаемым.
За подключение к серверу отвечает объект класса WebSocket, который будет создан внутри мидлвара. Все события этого объекта класса будут отправлять экшены в глобальный стейт.
*/

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;

      const {
        openConnection,  // для отправки запроса на установлениу ws
        onOpen,  // соединение успешно открылось
        onError, // возникла ошибка
        onGotOrders, // когда пришли данные о заказах
        onClose, // ws статус переменился на CLOSED
        sendMessage, // отправка заказа на сервер
        closeConnection,
      } = wsActions;

      // const { user } = getState().user;

      // для доступа к заказам прользователя нужно ещё передать токен
      // if (type === wsInit && user) {
      //   socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      // }

      // для подключения к общедоступной ленте заказов
      if (type === openConnection) {
        console.log('Initiating Websocket connection');
        console.log('action.url is ', action.url);
        socket = new WebSocket(action.url);
      }

      if (type === closeConnection) {
        console.log('Отправляем команду на закрытие сокета');
        socket.close();
        socket = null;
      }

      if (socket) {

        socket.onopen = () => {
          console.log('Successfully opened WebSocket connection');
          dispatch({ type: onOpen });
        }

        socket.onError = (event) => {
          console.log('WebSocket got erroe. Event is:');
          console.log(event);
          dispatch({ type: onError });
        }

        socket.onmessage = (event) => {
          console.log('Got message through WebSocket connection');
          const { data } = event;
          const parseData = JSON.parse(data);

          dispatch({
            type: onGotOrders,
            ordersData: parseData,
          });
        }

        socket.onclose = () => {
          console.log('Closed WebSocket connection');
          dispatch({ type: onClose });
        }

        // всю эту логику нужно дописать во всех файлах

        // if (type === sendMessage && socket) {
        //   const message = {
        //     ...payload,
        //     token: getCookie("accessToken"),
        //   };
        //   socket.send(JSON.stringify(message));
        // }

        // if (type === wsSendMessage) {
        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }

      }

      next(action);
    };
  };
};
