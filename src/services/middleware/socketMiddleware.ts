import { RootState } from '../store';
import { Middleware } from 'redux';
import { getAccessTokenLiteral } from '../../utils/cookie';
import { TwsActions } from "../actions/wsActions";

/* 
Всю логику взаимодействия с WebSocket разместим внутри мидлвара, что позволит разделить зоны ответственности частей приложения и сделать код более читабельным и поддерживаемым.
За подключение к серверу отвечает объект класса WebSocket, который будет создан внутри мидлвара. Все события этого объекта класса будут отправлять экшены в глобальный стейт.
*/

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { payload } = action;

      const {
        openConnection,  // для отправки запроса на установлениу ws
        onOpen,  // соединение успешно открылось
        onError, // возникла ошибка
        onGotOrders, // когда пришли данные о заказах
        onClose, // ws статус переменился на CLOSED
        sendMessage, // отправка заказа на сервер
        closeConnection, // экшн для отправки запроса на закрытие ws
      } = wsActions;

      // для подключения к общедоступной ленте заказов
      if (type === openConnection) {
        // console.log('Initiating Websocket connection');
        // console.log('action.url is ', action.url);
        socket = new WebSocket(action.url);
      }

      if (socket && type === closeConnection) {
        // console.log('Отправляем команду на закрытие сокета');
        socket.close();
        socket = null;
      }

      if (socket) {

        socket.onopen = () => {
          // console.log('Successfully opened WebSocket connection');
          dispatch({ type: onOpen });
        }

        socket.onerror = (event) => {
          // console.log('WebSocket got error. Event is:');
          // console.log(event);
          dispatch({ type: onError });
        }

        socket.onmessage = (event) => {
          // console.log('Got message through WebSocket connection');
          const { data } = event;
          const parseData = JSON.parse(data);

          dispatch({
            type: onGotOrders,
            ordersData: parseData,
          });
        }

        socket.onclose = () => {
          // console.log('Closed WebSocket connection');
          dispatch({ type: onClose });
        }
      }

      // в приложении это сейчас не используется, но по заданию добавить нужно. Для универсальности
      if (socket && type === sendMessage) {
        socket.send(JSON.stringify({
          ...payload,
          token: getAccessTokenLiteral(),
        }));
      }

      next(action);
    };
  };
};
