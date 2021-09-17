import { combineReducers } from 'redux';
import { burgerVendorReducer } from './burgerVendor';
import { userReducer } from './user'

export const rootReducer = combineReducers({
    burgerVendor: burgerVendorReducer,
    user: userReducer,
  });