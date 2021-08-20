import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// следующие две переменные нужны для подключения Redux Devtools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
// const store = createStore(rootReducer, applyMiddleware(thunk));  // если так, то не работает Redux DevTools

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
