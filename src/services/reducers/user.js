import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_SUCCESSFUL,
  SET_USER_DATA,
  ALLOW_RESET_PASSWORD,
  FORBID_RESET_PASSWORD,
  HAS_RESET_PASSWORD,
} from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  userName: '',
  userEmail: '',


  canResetPassword: false,
  hasResetPassword: false,

};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
      }
    }
    // дублирует LOGIN_SUCCESSFUL для удобства чтения экшенов
    case SET_USER_DATA: {
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
      }
    }
    case LOGOUT_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
      }
    }
    case ALLOW_RESET_PASSWORD: {
      return {
        ...state,
        canResetPassword: true,
        hasResetPassword: false,
      }
    }
    case FORBID_RESET_PASSWORD: { // мб уже не нужен?
      return {
        ...state,
        canResetPassword: false,
      }
    }
    case HAS_RESET_PASSWORD: {
      return {
        ...state,
        canResetPassword: false,
        hasResetPassword: true,
      }
    }
    default: {
      return state;
    }
  }
};