import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_SUCCESSFUL,
  SET_USER_DATA,
  ALLOW_RESET_PASSWORD,
  HAS_RESET_PASSWORD,
} from '../actions/userActions';

import { TUserActionsUnion } from '../actions/userActions';

export type TUserState = {
  isLoggedIn: boolean,
  userName: string,
  userEmail: string,
  canResetPassword: boolean,
  hasResetPassword: boolean,
  userChecked: boolean;
};

export const userInitialState: TUserState = {
  isLoggedIn: false,
  userName: '',
  userEmail: '',
  canResetPassword: false,
  hasResetPassword: false,
  userChecked: false,
};

export const userReducer = (state = userInitialState, action: TUserActionsUnion): TUserState => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
        userChecked: true, // можно не делать, т.к. даже после диспатча LOGIN_SUCCESSFUL все защищённые роуты будут перепроверяться через getUser, который диспатчит SET_USER_DATA
      }
    }
    // дублирует LOGIN_SUCCESSFUL для удобства чтения экшенов
    // используется при успешном автозалогинивании
    case SET_USER_DATA: {
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
        userChecked: true,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        userChecked: true,
      }
    }
    case LOGOUT_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        userChecked: true,
      }
    }
    case ALLOW_RESET_PASSWORD: {
      return {
        ...state,
        canResetPassword: true,
        hasResetPassword: false,
        userChecked: true,
      }
    }
    case HAS_RESET_PASSWORD: {
      return {
        ...state,
        userChecked: true,
        canResetPassword: false,
        hasResetPassword: true,
      }
    }
    default: {
      return state;
    }
  }
};