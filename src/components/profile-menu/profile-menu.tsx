import React, { useState, FC } from 'react';
import styles from './profile-menu.module.css';
import { ProfileTab } from '../profile-tab/profile-tab';
import { useHistory } from 'react-router-dom';
import { logOutThunk } from '../../services/actions/userActions';
import { TProfileMenuTabsValue } from '../../utils/types';

import { useAppDispatch } from '../../services/hooks';

type TProfileMenuProps = { activeTab: TProfileMenuTabsValue };

export const ProfileMenu: FC<TProfileMenuProps> = ({ activeTab }) => {
  const [currentTab] = useState(activeTab);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleTabClick = (value: TProfileMenuTabsValue) => {
    if (value === 'profile') {
      history.replace({ pathname: '/profile' });
    }

    if (value === 'orderHistory') {
      history.replace({ pathname: '/profile/orders' });
    }

    if (value === 'logOut') {
      console.log('Gonna try to log you out');
      console.log(`localStorage.getItem('refreshToken')`, localStorage.getItem('refreshToken'))
      dispatch(logOutThunk());
    }
  }

  return (
    <nav className={styles.menu}>
      <ProfileTab value="profile" isActive={currentTab === 'profile'} onClick={handleTabClick}>Профиль</ProfileTab>
      <ProfileTab value="orderHistory" isActive={currentTab === 'orderHistory'} onClick={handleTabClick}>История заказов</ProfileTab>
      <ProfileTab value="logOut" isActive={false} onClick={handleTabClick}>Выход</ProfileTab>

      <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
    </nav>
  );
};