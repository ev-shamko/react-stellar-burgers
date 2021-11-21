import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { confirmAuth } from '../services/actions/userActions';
import { wsActions } from '../services/actions/wsActions';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { getCookie, getAccessTokenLiteral } from '../utils/cookie';
import { ScrollableList } from '../components/scrollable-list/scrollable-list';
import {
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfileOrdersPage() {
  const dispatch = useDispatch();

  // const getAccessTokenLiteral = (): string => {
  //   let str = getCookie('accessToken');
  //   if (str) {
  //     str = str.split("Bearer ")[1]
  //   } else {
  //     str = '';
  //   }
  //   return str;
  // }

  useEffect(() => {
    console.log('Auth in /order');
    dispatch(confirmAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: wsActions.openConnection,
      url: `wss://norma.nomoreparties.space/orders?token=${getAccessTokenLiteral()}`,
      // `wss://norma.nomoreparties.space/orders?token=${ token?.split("Bearer ")[1]} `
    });
    return () => {
      console.log('Размонтируем /feed');
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch]);

  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={'orderHistory'} />
      <div className={styles.profileInfo + " profile-inputs"}>

        {/* <p className={'text text_type_main-default'}>Здесь будет история заказов.</p> */}
        <ScrollableList isPersonal={true} />

      </div>
    </section>
  );
}