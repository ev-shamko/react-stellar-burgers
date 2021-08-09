import { urlLoginRout } from './api-url';

// авторизация по email, password
// в аргумент нужно передать объект ответа от сервера с email, password успешно залогинившегося пользователя
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