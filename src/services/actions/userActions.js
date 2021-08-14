import { fetchLogIn, fetchLogOut, fetchUserData, fetchRefreshTokens, } from '../../utils/api-fetch';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
export const STOP_AUTO_LOGIN = 'STOP_AUTO_LOGIN'; //  так, я это пока отключила, но потом можно прикрутить обратно
export const ALLOW_RESET_PASSWORD = 'ALLOW_RESET_PASSWORD';
export const FORBID_RESET_PASSWORD = 'FORBID_RESET_PASSWORD';

export function logInApp(data) {
  return function (dispatch) {
    fetchLogIn(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
        });
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken); // по рекомендации наставника этот токен кладём в localStorage
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
        });

        console.log('Ошибка при авторизации по логину и паролю');
        return Promise.reject(err);
      });
  };
}

// data это refreshToken
export function logOut(data) {
  console.log('data is ', data)
  return function (dispatch) {
    console.log('Logging you out, Shepard'); // ;-)

    fetchLogOut(data)
      .then((res) => {

        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: LOGOUT_SUCCESSFUL
        });

        console.log('logged out successfully');
      })
      .catch(err => {
        console.log('Ошибка при разлогинивании');
        return Promise.reject(err);
      });
  };
}

export function getUser(safetyCounter) {
  console.log('Starting fn getUser with accessToken');

  /*************************************************************************** */
  /**** safetyCounter - предохранитель, чтобы не было бесконечной рекурсии ****/
  /************************************************************************* */
  safetyCounter++;
  console.log('safetyCounter in getUser: ', safetyCounter);

  // Если по какой-то причине сервер будет обновлять токены через refreshToken, но не будет залогинивать пользователя через accessToken, мы попадём в рекурсию. Будет вызываться getUser >> refreshAccessToken >> getUser >> refreshAccessToken и так до бесконечности. 
  // А нужно, чтобы цепочка максимум была такая: getUser >> refreshAccessToken >> getUser
  // Ситуация с бесконечной рекурсией маловероятна и свидетельствует о проблемах на сервере. Однако на всякий случай этот предохранитель со счётчиком  пусть будет. Он остановит бесконечные запросы к серверу.
  if (safetyCounter > 2) {
    return function (dispatch) {
      console.log('Вошли в рекурсию в fn getUser. Заканчиваем это безобразие.');

    }
  };
  /*************************************************************************** */

  return function (dispatch) {
    fetchUserData()
      .then(({ user }) => {
        console.log('Access granted. Welcome aboard, Commander!');

        dispatch({
          type: SET_USER_DATA,
          name: user.name,
          email: user.email,
        });


      })
      .catch((err) => {
        // если accessToken есть в браузере, но для сервера он просрочен, получим сообщение 'jwt expired' и пойдём делать рефреш токенов и автологиниться
        if (err.message === 'jwt expired') {
          console.log('Не получилось добыть юзердату через accessToken. Попробуем обновить токены');
          dispatch(refreshAccessToken(safetyCounter)); // сюда пробрасываем safetyCounter
        } else {
          console.log(err);
        }

      });
  }
}

export function refreshAccessToken(safetyCounter) {
  console.log('Refreshing tokens now');
  return function (dispatch) {
    fetchRefreshTokens()
      .then(({ accessToken, refreshToken }) => {
        console.log('Setting refreshed tokens');
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);

        // safetyCounter на данном этапе равен 1. Эта переменная предотвращает бесконечную рекурсию, если на сервере что-то сбойнуло.
        dispatch(getUser(safetyCounter));
      })
      .catch((err) => {
        console.log('.catch case in fn refreshAccessToken: ');
        return Promise.reject(err);
      })
  }
}

// авторизует пользователя, если есть accessToken. Или рефрешнет токены, а потом авторизует, если есть refreshToken
// можно вызывать confirmAuth() внутри if (!isLoggedIn)
export function confirmAuth() {
  return function (dispatch) {
    const hasAccessCookie = (getCookie('accessToken') != null); // когда куки удалятся, getCookie вернёт undefined. Проверку можно сделать нестрогой, т.к. в любом случае корректный токен - это строка с length > 0
    const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

    if (hasAccessCookie) {
      let safetyCounter = 0;
      dispatch(getUser(safetyCounter));
      return true;
    }

    if (!hasAccessCookie && hasRefreshToken) {
      let safetyCounter = 1;
      dispatch(refreshAccessToken(safetyCounter));
      return true;
    }

    return console.log('fn confirmAuth found no tokens. You may want to enter your login and password on a /login page');
  }
}