import { urlLoginRout, urlLogoutRout } from './api-url';

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
}


// logOUT по refreshToken
export function fetchLogOut(data) {
  return fetch(urlLogoutRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data), // data это refreshToken
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
}
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