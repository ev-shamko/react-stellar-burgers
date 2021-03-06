import { getCookie } from './cookie';
import {
  urlLoginRout,
  urlLogoutRout,
  urlUserDataEndpoint,
  urlApiToken,
  urlUserRegistration,
  urlResetPassword,
  urlSetNewPassword,
} from './api-url';

type TRegistrationData = {
  'email': string,
  'password': string,
  'name': string,
}

// Регистрация нового пользователя
export function fetchUserRegistration(data: TRegistrationData) {
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
      // console.log('Возникли проблемы при регистрации нового пользователя:')
      const response = await res.json();
      return Promise.reject(response);
    })
    .then((res) => {
      // console.log('Результаты успешного запроса о регистрации:')
      // console.log(res);
      return res;
    })
}
/*
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

type TLogInData = {
  'email': string,
  'password': string,
}

// logIN авторизация по email, password
// в аргумент data нужно передать объект ответа от сервера с email, password успешно залогинившегося пользователя
export function fetchLogIn(data: TLogInData) {
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
      // console.log('Результаты успешного запроса об авторизации:')
      // console.log(res);
      return res;
    })
};

// запрашивает у сервера код для смены пароля. Код придёт на почту

export function fetchRequestResetCode(userEmail: string) {
  // console.log('body', JSON.stringify({ email: userEmail }))
  return fetch(urlResetPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: userEmail }), // email
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      // console.log('Результаты запроса о коде восстановления пароля:')
      // console.log(res);
      return res;
    })
}

// запрос об установке нового пароля
export function fetchResetPassword(newPassword: string, resetCode: string) {
  return fetch(urlSetNewPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": newPassword,
      "token": resetCode
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      // console.log('Результаты запроса об установке нового пароля:')
      // console.log(res);
      return res;
    })
}

/****************************************************************************** */
/****************************************************************************** */

// получение данных о пользователе с помощью accessToken (который живёт 20 мин)
export function fetchGetUserData() {
  // console.log('accessToken', getCookie('accessToken'));

  return fetch(urlUserDataEndpoint, {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') as string,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      // console.log('Ошибка при попытке получить данные пользователя через accessToken. Возможно, так и должно быть, если токен просрочен.');
      return Promise.reject(await res.json());
      // если нет адекватного токена (например, пользователь вылогинился), консоль засирается красными ошибками. 
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Getting user data with accessToken failed:', res);
        return false;
      }
      // console.log('Getting user data with accessToken was successfull')
      // console.log(res);
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

type TChangeUserDataArg = {
  "name": string,
  "email": string,
  "password": string,
}

//запрос на изменение данных о пользователе (имя, мыло, пароль)
export function fetchChangeUserData(form: TChangeUserDataArg) {
  // console.log('getCookie( accessToken )', getCookie('accessToken'));
  // console.log('body is',
  //   `
  //     {
  //       "name": ${form.name},
  //       "email": ${form.email},
  //       "password": ${form.password},
  //     }`
  // );

  return fetch(urlUserDataEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': getCookie('accessToken') as string, // у меня записан вместе с 'Bearer '
    },
    body: JSON.stringify({
      "name": form.name,
      "email": form.email,
      "password": form.password,
    })
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      // console.log('Ошибка при попытке обновить данные пользователя');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        // console.error('Updating user data failed:', res);
        //return false;
      }
      // console.log('Updating user data was successfull');
      // console.log(res);
      return res;
    })
}


/****************************************************************************** */
/****************************************************************************** */

// Обновления токенов через refreshToken, если accessToken протух
export function fetchRefreshTokens() {
  // console.log('начало фетча за рефрешем токенов')
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
      // console.log('Ошибка при попытке обновить токены через refreshToken. Возможно, так и должно быть, если токены уже были обновлены в параллельной сессии.');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        // console.error('Couldn`t refresh tokens: ', res);
        return false;
      }
      // console.log('Got fresh tokens: ', res);
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
      // console.log('response from server: ', res)
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        // console.error('Didn`t logout properly', res);
      }
      // console.log('Body of response: ')
      // console.log(res);
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