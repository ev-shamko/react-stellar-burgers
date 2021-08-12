import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });
  const { isLoggedIn } = useSelector(store => store.user);

  const history = useHistory();

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Requesting redirection to password reset page');

      // TODO: написать логику переходов на /reset-password с учётом стетов
      // сюда добавить запись в стейт, что пользователь пытается восстановить пароль
      if (true) {
        history.replace({ pathname: '/reset-password' });
      }
    }, [history]
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