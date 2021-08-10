import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
  const [form, setFormValues] = useState({ password: '',  resetCode: '' });

  const history = useHistory();

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending request for password reset');

      if (true) {
        history.replace({ pathname: '/login' });
      }
    }
  ); //  [auth, form] будущие зависимости

  // можно реализовать доступ с проверкой стейта в сторе

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
          type={"password"}
          onChange={handleChange}
        />

        <Input
          type='text'
          placeholder='Введите код из письма'
          value={form.resetCode}
          name={'resetCode'}
          onChange={handleChange}

          error={false}
          errorText={''}
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