import { combineReducers } from 'redux';
import { burgerVendorReducer } from './burgerVendor';

export const rootReducer = combineReducers({
    burgerVendor: burgerVendorReducer,
  });