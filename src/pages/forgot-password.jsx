import React, { useCallback, useState, useEffect } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ALLOW_RESET_PASSWORD, confirmAuth } from '../services/actions/userActions';
import { setCookie } from '../utils/cookie';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });
  const { isLoggedIn } = useSelector(store => store.user);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Auth in /forgot-password');
    dispatch(confirmAuth());
  }, [dispatch]);

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Requesting redirection to password reset page');

      // включаем возможность зайти на страницу ввода нового пароля
      dispatch({
        type: ALLOW_RESET_PASSWORD,
      });

      // и ещё в куки запишем, что в течение 1 суток можно зайти на страницу ресета пароля
      setCookie('canResetPassword', 'yes', { expires: 60 * 60 * 24});

      if (true) { // после ушедшего запроса на сервер
        history.replace({ pathname: '/reset-password' });
      }
    }, [history, dispatch]
  ); //  [auth, form] будущие зависимости

  // редирект сработает и при авторизации, и при прямом переходе на страницу по ссылке
  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>

        <Input
          type='text'
          placeholder='Укажите e-mail'
          value={form.email}
          name={'email'}
          onChange={handleChange}

          error={false}
          errorText={'Введите корректный e-mail'}
        />

        <Button type="primary" size="medium">
          Восстановить
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}