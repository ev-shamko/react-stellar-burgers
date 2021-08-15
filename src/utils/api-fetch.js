import { getCookie } from './cookie';
import {
  urlLoginRout,
  urlLogoutRout,
  urlAuthUser,
  urlApiToken,
  urlUserRegistration,
} from './api-url';

// Регистрация нового пользователя
export function fetchUserRegistration(data) {
  return fetch(urlUserRegistration, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data), // email, password, name
  })
  .then(async (res) => {
    if (res.ok) {
      return res.json();
    }
    console.log('Возникли проблемы при регистрации нового пользователя:')
    const response = await res.json();
    return Promise.reject(response);
  })
  .then((res) => {
    console.log('Результаты успешного запроса о регистрации:')
    console.log(res);
    return res;
  })
}

/* Нужно отправить такое body 
{
    "email": "", 
    "password": "", 
    "name": "" 
} 

Тело ответа при успешной регистрации:
{
  "success": true,
  "user": {
      "email": "",
      "name": ""
  },
  "accessToken": "Bearer ...",
  "refreshToken": ""
} 
*/


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
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      console.log('Результаты успешного запроса об авторизации:')
      console.log(res);
      return res;
    })
};

/****************************************************************************** */
/****************************************************************************** */

// получение данных о пользователе с помощью accessToken (который живёт 20 мин)
export function fetchUserData() {
  // console.log('accessToken', getCookie('accessToken'));
  return fetch(urlAuthUser, {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке получить данные пользователя через accessToken. Возможно, так и должно быть, если токен просрочен.');
      return Promise.reject(await res.json());
      // если нет адекватного токена (например, пользователь вылогинился), консоль засирается красными ошибками. 
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Getting user data with accessToken failed:', res);
        //return false;
      }
      console.log('Getting user data with accessToken was successfull')
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


/****************************************************************************** */
/****************************************************************************** */

// Обновления токенов через refreshToken, если accessToken протух
export function fetchRefreshTokens() {
  console.log('начало фетча за рефрешем токенов')
  // console.log('текущий refreshToken', localStorage.getItem('refreshToken'));
  return fetch(urlApiToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке обновить токены через refreshToken. Возможно, так и должно быть, если токены уже были обновлены в параллельной сессии.');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Couldn`t refresh tokens: ', res);
        return false;
      }
      console.log('Got fresh tokens: ', res);
      return res;
    });
}

/* Тело ответа сервера при успешном обновлении токена:
{
  "success": true,
  "accessToken": "Bearer ...",
  "refreshToken": ""
}  */


/****************************************************************************** */
/****************************************************************************** */

// logOUT с помощью refreshToken
export function fetchLogOut() {
  // console.log('refreshToken',  localStorage.getItem('refreshToken'))
  return fetch(urlLogoutRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken'), }),
  })
    .then(async (res) => {
      console.log('response from server: ', res)
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Didn`t logout properly', res);
      }
      console.log('Body of response: ')
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