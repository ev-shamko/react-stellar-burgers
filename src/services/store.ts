import { socketMiddleware } from './middleware';
import { wsActions } from './actions/wsActions';
import { TBurgerVendorActionsUnion } from './actions/burgerVendor';
import { TUserActionsUnion } from './actions/userActions';
import { TwsActionsUnion} from './actions/wsActions';

export const wsCreatedMiddleware = socketMiddleware(wsActions);
export type TApplicationActionsUnion = TBurgerVendorActionsUnion | TUserActionsUnion | TwsActionsUnion; //нужен для типизации AppThunk
