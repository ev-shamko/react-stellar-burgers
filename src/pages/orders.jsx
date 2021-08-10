import React from 'react';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';

export function ProfileOrdersPage() {
  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={'orderHistory'} />
      <div className={styles.profileInfo + " profile-inputs"}>
        <p className={'text text_type_main-default'}>Здесь будет история заказов.</p>
      </div>
    </section>
  );
}