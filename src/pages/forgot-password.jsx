import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory } from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });

  const history = useHistory();

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Requesting redirection to password reset page');

      if (true) {
        history.replace({ pathname: '/reset-password' });
      }
    }
  ); //  [auth, form] будущие зависимости

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form}>
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

        <Button onClick={handleSubmit} type="primary" size="medium">
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