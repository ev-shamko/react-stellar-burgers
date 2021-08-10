import { fetchLogIn, fetchLogOut, fetchUserData, } from '../../utils/api-fetch';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
export const STOP_AUTO_LOGIN = 'STOP_AUTO_LOGIN';

export function logInApp(data) {
  return function (dispatch) {
    // console.log('In logInApp');

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
        console.log('Ошибка при авторизации по логину и паролю');
        console.log(err);
        dispatch({
          type: LOGIN_FAILED,
        });
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
        })

        console.log('logged out succsessfully');
      })
      .catch(err => {
        console.log('Ошибка при разлогинивании');
        console.log(err);
      });;
  };
}

export function getUser() {
  console.log('Starting getUser with accsessToken')
  return function (dispatch) {
    fetchUserData()
      .then(res => {
        console.log('getUser got data', res);
        return res;
      })
      .then(({ user }) => {
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
        });

        // 1 запроса к серверу достаточно
        dispatch({
          type: STOP_AUTO_LOGIN,
        });
      })
      .catch(() => {
        // если не получилось по токену получить юзердату, тем более нужно прекращать стучаться к серверу за данными
        dispatch({
          type: STOP_AUTO_LOGIN,
        });
      });
  }
}