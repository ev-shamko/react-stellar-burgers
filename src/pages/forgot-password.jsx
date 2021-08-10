import React, { useCallback, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../services/actions/userActions';


import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function ForgotPage() {
  const [form, setFormValues] = useState({ email: '' });
  const { isLoggedIn, mayAutoLogIn } = useSelector(store => store.user);

  const history = useHistory();
  const dispatch = useDispatch();

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
    }, [history]
  ); //  [auth, form] будущие зависимости

  // если прийти на страницу по прямой ссылке, то произойдёт авторизация при налии корректного accsessToken в куках, затем редиректнет на главную страницу
  if (!isLoggedIn && mayAutoLogIn) {
    dispatch(getUser());
    // а если адекватного accsessToken не было, можно будет ввести логин и пароль и залогиниться
  }

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