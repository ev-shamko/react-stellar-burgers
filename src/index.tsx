import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from './services/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/react-stellar-burger"> */} {/* Это для нормального сервера */}
    <HashRouter> {/* Это для gh-pages */}
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// это стандартное что-то из CRA, пока оставлю тут
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
