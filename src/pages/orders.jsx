import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { confirmAuth } from '../services/actions/userActions';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import {
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfileOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(confirmAuth());
  }, [dispatch]);

  ///////////////////////////
  let [counter1, set1] = React.useState(0);
  let [counter2, set2] = React.useState(0);
  let [counter3, set3] = React.useState(0);

  React.useEffect(() => {
    set1(counter1 + 1);
  }, []);

  React.useEffect(() => {
    set2(counter2 + 1);
  }, [counter3]);

  const handleClick = () => {
    set3(counter3 + 1);
  }

  //////////////////////////////////


  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={'orderHistory'} />
      <div className={styles.profileInfo + " profile-inputs"}>
        <p className={'text text_type_main-default'}>Здесь будет история заказов.</p>

        <Button onClick={handleClick}>{counter3}</Button>
        <p>Counter1 = {counter1}</p>
        <p>Counter2 = {counter2}</p>
      </div>
    </section>
  );
}