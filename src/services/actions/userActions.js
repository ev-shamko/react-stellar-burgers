import { fetchLogIn, fetchLogOut } from '../../utils/api-fetch';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';

export function logInApp(data) {
  return function (dispatch) {
    // console.log('In logInApp');

    fetchLogIn(data)
      .then(({ user, accessToken, refreshToken }) => {
        // console.log('In dispatch');
        // console.log({ user, accessToken, refreshToken});
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
          // accessToken,
          // refreshToken,
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
        dispatch({
          type: LOGOUT_SUCCESSFUL
        })

        deleteCookie("accessToken");
        localStorage.removeItem('refreshToken');
        console.log('logged out succsessfully');
      })
      .catch(err => {
        console.log('Ошибка при разлогинивании');
        console.log(err);
      });;
  };
}