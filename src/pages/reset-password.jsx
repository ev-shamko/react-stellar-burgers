import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCookie, getCookie } from '../utils/cookie';
import { FORBID_RESET_PASSWORD } from '../services/actions/userActions';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPassword() {
  const [form, setFormValues] = useState({ password: '', resetCode: '' });
  const { isLoggedIn, canResetPassword } = useSelector(store => store.user);

  const history = useHistory();
  const dispatch = useDispatch();


  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Sending request for password reset');

      if (true) {
        dispatch({
          type: FORBID_RESET_PASSWORD,
        });
        deleteCookie('canResetPassword');
        history.replace({ pathname: '/login' });
      }
    }, [history, dispatch]
  ); //  [auth, form] будущие зависимости


  /*******************************************************/
  /* ***** Логика редиректа прочь с этой страницы ***** */
  /*****************************************************/

  // авторизованный пользователь не может сменить пароль
  if (isLoggedIn) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  // пользователя редиректнет на страницу /forgot-password если он не запрашивал код для восстановления пароля в течение послдених суток
  // поскольку стейт canResetPassword обнуляется при перезагрузке страницы, дополнительно информация о том, что был запрошен резет пароля, хранится в куки в течение суток. 
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