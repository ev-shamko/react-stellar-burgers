import React, { useState } from 'react';
import styles from './profile-menu.module.css';
import { ProfileTab } from '../profile-tab/profile-tab';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/actions/userActions';

import PropTypes from 'prop-types';

//  activeTab ===  'profile' || 'orderHistory'
export function ProfileMenu({ activeTab }) {
  const [currentTab] = useState(activeTab);
  const history = useHistory();
  const dispatch = useDispatch();

  // даже если условие if возвращает true, код внутри блока не выполнится, если данный таб активен - это заложено в логике компонента ProfileTab
  const handleTabClick = (value) => {
    if (value === 'profile') {
      history.replace({ pathname: '/profile' });
    }

    if (value === "orderHistory") {
      history.replace({ pathname: '/profile/orders' });
    }
  }

  const handleLogOut = () => {   
    dispatch(logOut());
  };

  return (
    <nav className={styles.menu}>
      <ProfileTab value="profile" isActive={currentTab === 'profile'} onClick={handleTabClick}>Профиль</ProfileTab>
      <ProfileTab value="orderHistory" isActive={currentTab === 'orderHistory'} onClick={handleTabClick}>История заказов</ProfileTab>
      <ProfileTab value="logOut" isActive={currentTab === false} onClick={handleLogOut}>Выход</ProfileTab>

      <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
    </nav>
  );
};

ProfileMenu.propTypes = {
  activeTab: PropTypes.oneOf(['profile', 'orderHistory']),
};