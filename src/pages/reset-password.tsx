import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../utils/cookie';
import { setNewPassword } from '../services/actions/userActions';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
  const [form, setFormValues] = useState({ password: '', resetCode: '' });
  const { isLoggedIn, canResetPassword, hasResetPassword } = useSelector((store: any) => store.user);

  const dispatch = useDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending request for password reset');

      const newPassword = form.password;
      const resetCode = form['resetCode'];

      console.log('newPassword', newPassword);
      console.log('resetCode', resetCode);

      dispatch(setNewPassword(newPassword, resetCode));

      setFormValues({ ...form, password: '' });
    }, [dispatch, form]
  ); //  [auth, form] будущие зависимости


  /*******************************************************/
  /* ***** Логика редиректа прочь с этой страницы ***** */
  /*****************************************************/

  // авторизованный пользователь не может сменить пароль
  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  // после успешной смены пароля редиректнет на страницу логина
  if (hasResetPassword) {
    console.log('has reset password');
    return (<Redirect to={{ pathname: '/login' }} />);
  }

  // при прямом переходе на /reset-password пользователя редиректнет на страницу /forgot-password если он не запрашивал код для восстановления пароля в течение последениего часа
  // поскольку стейт canResetPassword обнуляется при перезагрузке страницы, дополнительно информация о том, что был запрошен резет пароля, хранится в куки в течение часа
  if (!canResetPassword && (getCookie('canResetPassword') !== 'yes')) {
    return (<Redirect to={{ pathname: '/forgot-password' }} />);
  }

  /*******************************************************/

  return (
    <div className={styles.wrap}>
      <form className={'auth-form ' + styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
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