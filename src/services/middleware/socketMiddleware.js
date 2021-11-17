

/* 
Всю логику взаимодействия с WebSocket разместим внутри мидлвара, что позволит разделить зоны ответственности частей приложения и сделать код более читабельным и поддерживаемым.
За подключение к серверу отвечает объект класса WebSocket, который будет создан внутри мидлвара. Все события этого объекта класса будут отправлять экшены в глобальный стейт.
*/

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      // const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { onOpen, onGotOrders, onClose, openConnection, closeConnection } = wsActions;

      // const { user } = getState().user;

      // для подключения к общедоступной ленте заказов
      if (type === openConnection) {
        console.log('Initiating Websocket connection');
        socket = new WebSocket(wsUrl);
      }

      if (socket) {

        socket.onopen = () => {
          console.log('Successfully opened WebSocket connection');
          dispatch({ type: onOpen });
        }

        socket.onmessage = (event) => {
          console.log('Got message through WebSocket connection');
          const { data } = event;
          const parseData = JSON.parse(data);

          dispatch({
            type: onGotOrders,
            payload: parseData,
          });
        }

        socket.onclose = () => {
          console.log('Closed WebSocket connection');
          dispatch({ type: onClose });
        } 
      }


      // для доступа к заказам прользователя нужно ещё передать токен
      // if (type === wsInit && user) {
      //   socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      // }

      /*
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        // socket.onerror = event => {
        //   dispatch({ type: onError, payload: event });
        // };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onGotOrders, payload: restParsedData });
        };

        // socket.onclose = event => {
        //   dispatch({ type: onClose });
        // };

        // if (type === wsSendMessage) {
        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }
      }
      */

      next(action);
    };
  };
};
