import React, { useEffect } from "react";
import { appUseDispatch } from '../services/hooks';
import { confirmAuthThunk } from '../services/actions/userActions';
import { wsActions } from '../services/actions/wsActions';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { getAccessTokenLiteral } from '../utils/cookie';
import { wsOrders } from '../utils/api-url';
import { ScrollableList } from '../components/scrollable-list/scrollable-list';

export function ProfileOrdersPage() {
  const dispatch = appUseDispatch();

  useEffect(() => {
    console.log('Auth in profile/orders');
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: wsActions.openConnection,
      url: wsOrders + `?token=${getAccessTokenLiteral()}`,     
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