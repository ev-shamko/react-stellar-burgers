import React, { useCallback, useState, useEffect } from 'react';
import { appUseDispatch, appUseSelector } from '../services/hooks';
import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { confirmAuth, registerNewUser } from '../services/actions/userActions';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function RegistrationPage() {
  const [form, setFormValues] = useState({ email: '', name: '', password: '' });
  const { isLoggedIn } = appUseSelector((store) => store.user);

  const dispatch = appUseDispatch();

  useEffect(() => {
    console.log('Auth in /registration');
    dispatch(confirmAuth());
  }, [dispatch]);

   // автоподстановка корректного логина и пароля  ВЫКЛЮЧИТЬ НА ПРОДЕ
   useEffect(() => {
    setFormValues(
      { email: 'shamko.e.v+1@yandex.ru', name: 'User1', password: '123123' }
    );
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  // после регистрации редиректит на /login
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending registration request');
      dispatch(registerNewUser(form));

      // if (true) {
      //   history.replace({ pathname: '/login' });
      // }
    }, [dispatch, form]
  );

  // редирект сработает и при авторизации, и при прямом переходе на страницу по ссылке
  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>

        <Input
          type='text'
          placeholder='Имя'
          value={form.name}
          name={'name'}
          onChange={handleChange}

          error={false}
          errorText={'Имя должно состоять из символов галактического алфавита'}
        />

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
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}