import { userReducer, userInitialState } from './user';
import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_SUCCESSFUL,
  SET_USER_DATA,
  ALLOW_RESET_PASSWORD,
  HAS_RESET_PASSWORD,
} from '../actions/userActions';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(userInitialState)
  });


  it('should handle SET_USER_DATA', () => {
    expect(userReducer(userInitialState, {
      type: SET_USER_DATA,
      name: 'Test Name',
      email: 'qwerty@ya.ru'
    })).toEqual({
      isLoggedIn: true,
      userName: 'Test Name',
      userEmail: 'qwerty@ya.ru',
      canResetPassword: false,
      hasResetPassword: false,
      userChecked: true,
    });
  });

  it('should handle LOGIN_SUCCESSFUL', () => {
    expect(userReducer(userInitialState, {
      type: LOGIN_SUCCESSFUL,
      name: 'Test Name',
      email: 'qwerty@ya.ru'
    })).toEqual({
      isLoggedIn: true,
      userName: 'Test Name',
      userEmail: 'qwerty@ya.ru',
      canResetPassword: false,
      hasResetPassword: false,
      userChecked: true,
    });
  });

  it('should handle LOGIN_FAILED', () => {
    expect(userReducer(userInitialState, {
      type: LOGIN_FAILED,
    })).toEqual({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      canResetPassword: false,
      hasResetPassword: false,
      userChecked: true,
    });
  });

  it('should handle LOGOUT_SUCCESSFUL', () => {
    expect(userReducer({
      isLoggedIn: true,
      userName: 'Test Name',
      userEmail: 'qwerty@ya.ru',
      canResetPassword: false,
      hasResetPassword: false,
      userChecked: true,
    }, {
      type: LOGOUT_SUCCESSFUL,
    })).toEqual({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      canResetPassword: false,
      hasResetPassword: false,
      userChecked: true,
    });
  });

  it('should handle ALLOW_RESET_PASSWORD', () => {
    expect(userReducer(userInitialState, {
      type: ALLOW_RESET_PASSWORD,
    })).toEqual({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      userChecked: true,
      canResetPassword: true,
      hasResetPassword: false,
    });
  });

  it('should handle HAS_RESET_PASSWORD', () => {
    expect(userReducer(userInitialState, {
      type: HAS_RESET_PASSWORD,
    })).toEqual({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      userChecked: true,
      canResetPassword: false,
      hasResetPassword: true,
    });
  });
});