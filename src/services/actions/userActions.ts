import {
  fetchLogIn,
  fetchLogOut,
  fetchGetUserData,
  fetchRefreshTokens,
  fetchUserRegistration,
  fetchRequestResetCode,
  fetchResetPassword,
  fetchChangeUserData,
} from '../../utils/api-fetch';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUserForm, TLoginForm } from '../../utils/types';

export const LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL' = 'LOGIN_SUCCESSFUL';
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL: 'LOGOUT_SUCCESSFUL' = 'LOGOUT_SUCCESSFUL';
export const ALLOW_RESET_PASSWORD: 'ALLOW_RESET_PASSWORD' = 'ALLOW_RESET_PASSWORD';
export const HAS_RESET_PASSWORD: 'HAS_RESET_PASSWORD' = 'HAS_RESET_PASSWORD';


// типизирует генератор экшена и экшен в reducer/user
export interface ILoginSuccessful {
  readonly type: typeof LOGIN_SUCCESSFUL;
  readonly name: string,
  readonly email: string
  readonly isLoggedIn: boolean,
}

// генератор экшенов, некоторым с ними удобнее
export const LoginSuccessful = (name: string, email: string): ILoginSuccessful => {
  return {
    type: LOGIN_SUCCESSFUL,
    isLoggedIn: true,
    name,
    email,
  };
}

// *****

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
  readonly isLoggedIn: boolean,
  readonly name: string,
  readonly email: string,
}

// *****

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
  readonly isLoggedIn: boolean,
  readonly name: '',
  readonly email: '',
}

// *****

export interface ILogoutSuccessful {
  readonly type: typeof LOGOUT_SUCCESSFUL;
  readonly isLoggedIn: boolean,
  readonly name: '',
  readonly email: '',
}

// *****

export interface IAllowResetPassword {
  readonly type: typeof ALLOW_RESET_PASSWORD;
  readonly canResetPassword: boolean,
  readonly hasResetPassword: boolean,
}

// *****

export interface IHasResetPassword {
  readonly type: typeof HAS_RESET_PASSWORD;
  readonly canResetPassword: boolean,
  readonly hasResetPassword: boolean,
}

// это union-тип, объединяющий в себе все типы экшенов
export type TUserActionsUnion = ILoginSuccessful | ISetUserData | ILoginFailed | ILogoutSuccessful | IAllowResetPassword | IHasResetPassword;


// Миддлвары для thunk:

export function registerNewUser(data: TUserForm) {
  console.log('Начинаем регистрацию нового пользователя');
  console.log('data: ', data);
  //@ts-ignore
  return function (dispatch) {
    fetchUserRegistration(data)
      .then(({ user, accessToken, refreshToken }) => {
        // поскольку после успешной регистрации сервер возвращает токены и юзернейм, есть смысл автоматом залогинить юзера
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
        });
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        console.log('Ошибка при попытке зарегистрироваться');
        return console.log(err);
      });
  }
}

export function logInApp(data: TLoginForm) {
  //@ts-ignore
  return function (dispatch) {
    fetchLogIn(data)
      .then(({ user, accessToken, refreshToken, success }) => {
        if (success === true) {
          dispatch({
            type: LOGIN_SUCCESSFUL,
            name: user.name,
            email: user.email,
          });

          setCookie("accessToken", accessToken, { expires: 20 * 60 });
          localStorage.setItem('refreshToken', refreshToken); // по рекомендации наставника этот токен кладём в localStorage
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
        });

        console.log('Ошибка при авторизации по логину и паролю');
        return console.log(err);
      });
  };
}

export function logOut() {
  //@ts-ignore

  return function (dispatch) {
    console.log('Logging you out, Shepard'); // ;-)

    fetchLogOut()
      .then((res) => {
        console.log('res in logOut: ', res)
        console.log('res.success', res.success)
        if (res.success === true) {
          console.log('Now deleting tokens');
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');

          dispatch({
            type: LOGOUT_SUCCESSFUL
          });
          console.log('Logged out successfully');
        }
      })
      .catch(err => {
        console.log('Ошибка при разлогинивании');
        return console.log(err);
      });
  };
}

export function requestResetCode(email: string) {
  //@ts-ignore

  return function (dispatch) {
    console.log(`Запрашиваем код для смены пароля для email: ${email}`);

    fetchRequestResetCode(email)
      .then(res => {
        console.log('res in fn requestResetCode: ', res);

        if (res.success === true) {
          // отмечаем в хранилище, что можно пустить пользователя на страницу ввода нового пароля
          dispatch({
            type: ALLOW_RESET_PASSWORD,
          });

          // и ещё в куки запишем, что в течение 1 суток можно зайти на страницу ресета пароля
          setCookie('canResetPassword', 'yes', { expires: 60 * 60 * 1 });
        }
      })
      .catch(err => {
        console.log('Smth went wrong while requesting for reset code');
        console.log(err);
      })
  }
}

export function setNewPassword(newPassword: string, resetCode: string) {
  //@ts-ignore

  return function (dispatch) {
    console.log('newPassword', newPassword);
    console.log('resetCode', resetCode);

    fetchResetPassword(newPassword, resetCode)
      .then(res => {
        if (res.success === true) {
          dispatch({
            type: HAS_RESET_PASSWORD,
          });

          setCookie('canResetPassword', 'no', { expires: -1 });
        }
      })
      .catch(err => {
        console.log('Smth went wrong while requesting for password change');
        console.log(err);
      })
  }
}

export function patchUserData(form: TUserForm, setFormValues: any) {
  //@ts-ignore
  return function (dispatch) {
    // console.log('new Name', form.name);
    // console.log('new Email', form.email);
    // console.log('new Password', form.password);

    fetchChangeUserData(form)
      .then(res => {
        console.log(res);

        dispatch({
          type: SET_USER_DATA,
          name: res.user.name,
          email: res.user.email,
        });

        setFormValues({ name: res.user.name, email: res.user.email, password: '' });
      })
  }
}


/************************************************************************** */
/******   Авто-авторизация, рефреш токенов, получение юзердаты   ********* */
/************************************************************************ */

// авторизует пользователя, если есть accessToken. Или, если есть refreshToken, рефрешнет токены, а потом авторизует
export function confirmAuth() {
  //@ts-ignore

  return async function (dispatch) {
    const hasAccessCookie = (getCookie('accessToken') != null); // когда куки удалятся, getCookie вернёт undefined. Проверку можно сделать нестрогой, т.к. в любом случае корректный токен - это строка с length > 0
    const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

    if (hasAccessCookie) {
      let safetyCounter = 0;
      dispatch(getUser(safetyCounter));
      return 'has logged in';
    }

    if (!hasAccessCookie && hasRefreshToken) {
      let safetyCounter = 1;
      dispatch(refreshAccessToken(safetyCounter));
      return 'has refreshed tokens, than logged in';
    }

    return console.log('fn confirmAuth found no tokens. You may want to enter your login and password on a /login page');
  }
}

export function getUser(safetyCounter: number) {
  console.log('Starting fn getUser with accessToken');

  /**** safetyCounter - предохранитель, чтобы не было бесконечной рекурсии ****/
  safetyCounter++;
  console.log('safetyCounter in getUser: ', safetyCounter);

  // Если по какой-то причине сервер будет обновлять токены через refreshToken, но не будет залогинивать пользователя через accessToken, мы попадём в рекурсию. Будет вызываться getUser >> refreshAccessToken >> getUser >> refreshAccessToken и так до бесконечности. 
  // А нужно, чтобы цепочка максимум была такая: getUser >> refreshAccessToken >> getUser
  // Ситуация с бесконечной рекурсией маловероятна и свидетельствует о проблемах на сервере. Однако на всякий случай этот предохранитель со счётчиком  пусть будет. Он остановит бесконечные запросы к серверу.
  if (safetyCounter > 2) {
    return function () {
      console.log('Вошли в рекурсию в fn getUser. Заканчиваем это безобразие.');

    }
  };
  /*************************************************************************** */
  //@ts-ignore

  return function (dispatch) {
    fetchGetUserData()
      .then(({ user, success }) => {
        if (success === true) {
          console.log('Access granted. Welcome aboard, Commander!');

          dispatch({
            type: SET_USER_DATA,
            name: user.name,
            email: user.email,
          });
        }
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

export function refreshAccessToken(safetyCounter: number) {
  console.log('Refreshing tokens now');
  //@ts-ignore

  return function (dispatch) {
    fetchRefreshTokens()
      .then(({ accessToken, refreshToken }) => {
        console.log('Setting refreshed tokens');
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);

        // safetyCounter на данном этапе равен 1. Эта переменная предотвращает бесконечную петл. getUser >> refreshAccessToken >> getUser, если на сервере что-то сбойнуло.
        dispatch(getUser(safetyCounter));
      })
      .catch((err) => {
        console.log('.catch case in fn refreshAccessToken: ');
        return console.log(err);
      })
  }
}
