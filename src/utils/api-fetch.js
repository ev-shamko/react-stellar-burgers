import { getCookie } from './cookie';
import {
  urlLoginRout,
  urlLogoutRout,
  urlAuthUser,
} from './api-url';

// logIN авторизация по email, password
// в аргумент data нужно передать объект ответа от сервера с email, password успешно залогинившегося пользователя
export function fetchLogIn(data) {
  return fetch(urlLoginRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data), // email, password
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      console.log('Результаты успешного запроса об авторизации:')
      console.log(res);
      return res;
    })
};

// получение данных о пользователе с помощью accessToken (который живёт 20 мин)
export function fetchUserData() {
  return fetch(urlAuthUser, {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке получить данные пользователя через accsessToken. Возможно, так и должно быть, если токен просрочен.');
      return Promise.reject(res); // если нет адекватного токена (например, пользователь вылогинился), консоль засирается красными ошибками. 
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('getUser with accessToken failed:', res);
      }
      console.log('getUser with accessToken successfull')
      console.log(res);
      return res;
    })
}
/*
{
  "success": true,
  "user": {
    "email": "",
    "name": ""
  }
} 
*/


// logOUT с помощью refreshToken
export function fetchLogOut(refreshToken) {
  return fetch(urlLogoutRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(refreshToken),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Didn`t logout properly', res);
      }
      console.log('Logout successfull')
      console.log(res);
      return res;
    })
};
/* Варианты ответа от сервера при запросе на логаут:
{
  "success": true,
  "message": "Successful logout"
}
{
    "success": false,
    "message": "Token required"
}
*/