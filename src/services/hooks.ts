import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, RootState, AppThunk } from '../services/store';

// Теперь этот хук «знает» структуру хранилища
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useAppDispatch = () => dispatchHook<AppDispatch | AppThunk>();
