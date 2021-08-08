import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [form, setFormValues] = useState({ email: '', password: '' });

  const history = useHistory();

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  // после успешной авторизации нужен редирект на главную страницу (? или в профиль)
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending login request');

      if (true) {
        history.replace({ pathname: '/' });
      }
    },
    [history]
  );

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form}>
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
          type={"password"}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} type="primary" size="medium">
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
