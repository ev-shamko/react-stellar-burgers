import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/index';
import { wsCreatedMiddleware, TApplicationActionsUnion } from './services/store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

// следующие две переменные нужны для подключения Redux Devtools
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk, wsCreatedMiddleware));
const store = createStore(rootReducer, enhancer); // вот при этом плагин Redux DevTools работает
// const store = createStore(rootReducer, applyMiddleware(thunk));  // если так, то не работает Redux DevTools

// ************** Типизация Redux

// эту типизацию можно вынести в /services/types/index.ts   но здесь её держать удобнее и нагляднее. К тому же тут всего несколько строк
export type RootState = ReturnType<typeof rootReducer>; // типизация redux-хранилища - - - можно <typeof rootReducer>  

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

// Типизация thunk'ов в нашем приложении
// "thunk — это функция которая возвращает другую функцию, в замыкании которой есть метод dispatch и которая может вернуть (а может и не вернуть) какой-то результат 🤯" (с)
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActionsUnion>>; // это, конечно, совершенно чудовищная конструкция



// ************** 


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">

      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// это стандартное что-то из CRA, пока оставлю тут
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
