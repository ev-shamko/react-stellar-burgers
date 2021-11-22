import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, RootState, AppThunk } from '../index';

// Теперь этот хук «знает» структуру хранилища
export const appUseSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const appUseDispatch = () => dispatchHook<AppDispatch | AppThunk>();
