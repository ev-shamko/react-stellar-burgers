import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { logInAppThunk, confirmAuthThunk } from '../services/actions/userActions';

import { useAppDispatch, useAppSelector } from '../services/hooks';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [form, setFormValues] = useState({ email: '', password: '' });
  const { isLoggedIn } = useAppSelector((store) => store.user); // TODO: типизируем в следующем спринте
  const dispatch = useAppDispatch();

  // https://reactrouter.com/web/api/Hooks/uselocation
  // https://reactrouter.com/web/api/location 
  const location = useLocation<{ from: Location }>(); // создаст объект, в котором будут и текущий адрес, и адрес, откуда пришли, если пришли из ProtectedRoute (location.state.from.pathname)

  // автологин
  useEffect(() => {
    // console.log('Auth in /login');
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  // автоподстановка корректного логина и пароля  ВЫКЛЮЧИТЬ НА ПРОДЕ
  // useEffect(() => {
  //   setFormValues(
  //     { email: 'shamko.e.v@yandex.ru', password: '123123' }
  //   );
  // }, [isLoggedIn, location]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => { 
      e.preventDefault();
      // console.log('Sending login request');
      // console.log(form);

      dispatch(logInAppThunk(form));
    },
    [form, dispatch]
  );

  // редирект сработает и при авторизации, и при прямом переходе на страницу по ссылке
  if (isLoggedIn) {
    // console.log('IS LOGGED IN, location:  ', location)
    return (<Redirect to={ location.state?.from || '/'} />); // пропс to={} примет либо объект location от предыдущей страницы (он м.б. передан в пропсах), и вытащит оттуда роут предыдущей страницы, на которую нужно вернуть пользователя. Либо примет путь '/'
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>

        <Input
          type='email'
          placeholder='E-mail'
          value={form.email}
          name={'email'}
          onChange={handleChange}

          error={false}
          errorText={'Введите корректный e-mail'}
        />

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
          onChange={handleChange}
        />

        <Button type="primary" size="medium">
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link to={"/registration"} className={"text_color_link"}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to={"/forgot-password"} className={"text_color_link"}>
            Восстановить пароль
          </Link>
        </p>

      </form>
    </div>
  );
}
