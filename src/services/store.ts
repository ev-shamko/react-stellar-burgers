import { socketMiddleware } from './middleware';
import { wsActions, TwsActionsUnion } from './actions/wsActions';
import { TBurgerVendorActionsUnion } from './actions/burgerVendor';
import { TUserActionsUnion } from './actions/userActions';

import { rootReducer } from './reducers';
import { createStore, compose, applyMiddleware, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import thunk from 'redux-thunk';

export const wsCreatedMiddleware = socketMiddleware(wsActions);
export type TApplicationActionsUnion = TBurgerVendorActionsUnion | TUserActionsUnion | TwsActionsUnion; //нужен для типизации AppThunk


// ************** Подключение Redux Devtools ******************
// ********************************************************

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsCreatedMiddleware));



// ************** Создание объекта хранилища ******************
// ********************************************************

// это - сам объект хранилища, "глобальный", на чистом редаксе
export const store = createStore(rootReducer, enhancer); // вот при такой записи плагин Redux DevTools работает

// если так записать, то не работает Redux DevTools:
// const store = createStore(rootReducer, applyMiddleware(thunk));  



// ************** Типизация Redux ******************
// *********************************************

// типизация redux-хранилища  
export type RootState = ReturnType<typeof rootReducer>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;


// Типизация thunk'ов:
// "thunk — это функция которая возвращает другую функцию, в замыкании которой есть метод dispatch и которая может вернуть (а может и не вернуть) какой-то результат 🤯" (с)
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActionsUnion>>; // это, конечно, совершенно чудовищная конструкция
