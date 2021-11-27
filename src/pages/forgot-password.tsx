import React, { useCallback, useState, useEffect } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { confirmAuthThunk, requestResetCodeThunk, } from '../services/actions/userActions';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });
  const { isLoggedIn, canResetPassword } = useAppSelector((store) => store.user);

  // const history = useHistory();
  const dispatch = useAppDispatch();

  // автоподстановка корректного логина и пароля  ВЫКЛЮЧИТЬ НА ПРОДЕ
  useEffect(() => {
    setFormValues(
      { email: 'shamko.e.v@yandex.ru' }
    );
  }, []);

  useEffect(() => {
    console.log('Auth in /forgot-password');
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Requesting redirection to password reset page', form['email']);

      // включаем возможность зайти на страницу ввода нового пароля
      // dispatch({
      //   type: ALLOW_RESET_PASSWORD,
      // });

      dispatch(requestResetCodeThunk(form.email));

      // if (true) { // после ушедшего запроса на сервер
      //   history.replace({ pathname: '/reset-password' });
      // }
    }, [dispatch, form]
  ); //  [auth, form] будущие зависимости

  // редирект сработает и при авторизации, и при прямом переходе на страницу по ссылке
  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  if (!isLoggedIn && canResetPassword) {
    return (<Redirect to={{ pathname: '/reset-password' }} />);
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