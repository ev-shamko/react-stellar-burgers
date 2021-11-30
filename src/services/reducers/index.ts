import { combineReducers } from 'redux';
import { burgerVendorReducer } from './burgerVendor';
import { userReducer } from './user';
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
    burgerVendor: burgerVendorReducer,
    user: userReducer,
    ws: wsReducer,
  });