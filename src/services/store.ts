import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import { wsActions } from './actions/wsActions';
import { TBurgerVendorAcrtionsUnion } from './actions/burgerVendor';
import { TUserActionsUnion } from './actions/userActions';
import { TwsActionsUnion} from './actions/wsActions';

import thunkMiddleware from 'redux-thunk';

// const wsUrlAll = "wss://norma.nomoreparties.space/orders/all";

export const wsCreatedMiddleware = socketMiddleware(wsActions);

export type TApplicationActionsUnion = TBurgerVendorAcrtionsUnion | TUserActionsUnion | TwsActionsUnion; //нужен для типизации AppThunk

// export const initStore = (initialState = {}) =>
//   createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrlAll, wsActions))) 
//   );