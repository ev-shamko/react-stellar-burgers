import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
} from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  userName: '',
  userEmail: '',

  accessToken: null,
  refreshToken: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        accessToken: null,
        refreshToken: null,
      }
    }
    default: {
      return state;
    }
  }
};