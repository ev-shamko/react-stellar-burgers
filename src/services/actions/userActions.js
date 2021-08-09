import { fetchLogIn } from '../../utils/api-fetch';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';

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
          accessToken,
          refreshToken,
        });
        // ещё добавить токены в куки
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