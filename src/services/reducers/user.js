import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_SUCCESSFUL,
} from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  userName: '',
  userEmail: '',
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
    default: {
      return state;
    }
  }
};