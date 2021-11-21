import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import { wsActions } from '../services/actions/wsActions';
import thunkMiddleware from 'redux-thunk';

// const wsUrlAll = "wss://norma.nomoreparties.space/orders/all";

export const wsCreatedMiddleware = socketMiddleware(wsActions);

// export const initStore = (initialState = {}) =>
//   createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrlAll, wsActions))) 
//   );