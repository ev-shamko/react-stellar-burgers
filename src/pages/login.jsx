import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth-form.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logInApp } from '../services/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

/*
- На странице login следим, залогинен ли уже юзер (берем данные авторизации из стора через useSelector)
- Если не залогинен, показываем ему форму
- Если залогинен, то рендерим компонент <Redirect to={…} />, чтобы пользователя перекинуло в предыдущую локацию, откуда он пришел в логин
Получается, при заполнении формы данные положатся в стор, компонент страницы логина пойдет перерендериваться, и там сработает редирект
*/

export function LoginPage() {
  const [form, setFormValues] = useState({ email: '', password: '' });
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  // УДАЛИТЬ НА ПРОДЕ
  // автоподстановка корректного логина и пароля для авторизации
  useEffect(() => {
    setFormValues(
      { email: 'shamko.e.v@yandex.ru', password: '123123' }
    )
  }, []);

  /*
  // строго после авторизации и изменении isLoggedIn редиректнет в профиль
  useEffect(() => {
    if (isLoggedIn) {
      // <Redirect to={{ pathname: '/' }} />
      history.replace({ pathname: '/profile' }); //  лучше сделать через компонент <Redirect/> , а не через history
    }
  }, [isLoggedIn]);
*/

  // после успешной авторизации нужен редирект на главную страницу (? или в профиль)
  const handleSubmit = useCallback(
    async e => { // в итоге не нужна тут псевдосинхронность
      e.preventDefault();
      console.log('Sending login request');
      console.log(form);

      await dispatch(logInApp(form));
      // history.replace({ pathname: '/profile' });
      // history.replace({ pathname: '/profile' });
    },
    [form, dispatch]
  );

  // редирект сработает и при авторизации, и при прямом переходе на страницу по ссылке
  if (isLoggedIn) {
    return ( <Redirect to={{ pathname: '/' }} /> );
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
