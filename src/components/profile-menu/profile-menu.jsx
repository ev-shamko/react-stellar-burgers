import React, { useCallback, useState } from 'react';
import styles from './profile-menu.module.css';
import { ProfileTab } from '../profile-tab/profile-tab';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { logOut } from '../../services/actions/userActions';

import PropTypes from 'prop-types';

//  activeTab === 
export function ProfileMenu({ activeTab }) {
  const [currentTab] = useState(activeTab); // 'profile' || 'logOut' || 'orderHistory'
  const history = useHistory();
  const dispatch = useDispatch();

  // даже если условие if возвращает true, код внутри блока не выполнится, если данный таб активен - это заложено в логике компонента ProfileTab
  const handleTabClick = (value) => {
    if (value === 'profile') {
      //открыть /profile
      history.replace({ pathname: '/profile' });
    }

    if (value === "orderHistory") {
      // открыть /profile/orders
      history.replace({ pathname: '/profile/orders' });
    }
  }

  const handleLogOut = () => {
    const refreshToken = localStorage.getItem('refreshToken'); // string
    
    dispatch(logOut({ token: refreshToken }));

    // этот компонент отрисовывается в защищённом роуте, 
    // поэтому после логаута юзера автоматом редиректнет на /login
    // больше здесь не нужна history.replace 
  };

  return (
    <nav className={styles.menu}>
      <ProfileTab value="profile" isActive={currentTab === 'profile'} onClick={handleTabClick}>Профиль</ProfileTab>
      <ProfileTab value="orderHistory" isActive={currentTab === 'orderHistory'} onClick={handleTabClick}>История заказов</ProfileTab>
      <ProfileTab value="logOut" isActive={currentTab === 'logOut'} onClick={handleLogOut}>Выход</ProfileTab>

      <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
    </nav>
  );
};

ProfileMenu.propTypes = {
  activeTab: PropTypes.oneOf(['profile', 'orderHistory', 'logOut']),
};