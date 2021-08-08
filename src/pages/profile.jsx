import React, { useCallback, useState } from 'react';
import styles from './profile.module.css';
import { Link, useHistory } from 'react-router-dom';
import { ProfileMenu } from '../components/profile-menu/profile-menu'

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
  const [form, setFormValues] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

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

        <PasswordInput
          value={form.password}
          name={'password'}
          size={'default'}
          type={"password"}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};
