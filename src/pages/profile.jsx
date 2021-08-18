import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { confirmAuth, patchUserData } from '../services/actions/userActions';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
  const [form, setFormValues] = useState({ name: '', email: '', password: '' });
  const { userName, userEmail } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(confirmAuth());
  }, [dispatch]);

  // при загрузке компонента в поля поставятся имя и почта из стейта
  useEffect(() => {
    setFormValues({ ...form, name: userName, email: userEmail })
    //eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(patchUserData(form, setFormValues));
  }
  
  const handleCansel = e => {
    e.preventDefault();
    setFormValues({ name: userName, email: userEmail, password: '' });
  }

  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={'profile'} />
      <form className={styles.profileInfo + " profile-inputs"}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          value={form.name}
          onChange={handleChange}
          icon={"EditIcon"}
          error={false}
        />

        <Input
          type={"text"}
          name={"email"}
          placeholder={"e-mail"}
          value={form.email}
          onChange={handleChange}
          icon={"EditIcon"}
          error={false}
        />

        <Input
          type={"text"}
          name={'password'}
          placeholder={"Пароль"}
          value={form.password}
          onChange={handleChange}
          size={'default'}
          icon={"EditIcon"}
          error={false}
        />
        <div className={styles.buttonWrap}>
          <Button onClick={handleSubmit}>Сохранить</Button>
          <Button onClick={handleCansel} type="secondary">Отмена</Button>
        </div>
      </form>
    </section>
  );
};
