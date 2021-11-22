import React, { useEffect } from "react";
import headerStyles from "./app-header.module.css";
import { appUseDispatch } from '../../services/hooks';
import { confirmAuthThunk } from '../../services/actions/userActions';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  getIngridientsData,
} from '../../services/actions/burgerVendor';
import { urlApiGetIngridients } from '../../utils/api-url';

function AppHeader() {
  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(confirmAuthThunk());
    dispatch(getIngridientsData(urlApiGetIngridients));
  }, [dispatch]);

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContainer}>
        <nav className='text text_type_main-default'>
          <ul className={headerStyles.navBurgerBuilder}>
            <li className={headerStyles.headerButton}>
              <Link to='/' className={headerStyles.navlink}>
                <div className={headerStyles.navButton}>
                  <BurgerIcon type="primary" />
                  <span className={headerStyles.buttonCaption}>Конструктор</span>
                </div>
              </Link>
            </li>
            <li className={headerStyles.headerButton}>
              <Link to='/feed' className={headerStyles.navlink}>
                <div className={headerStyles.navButton + '  text_color_inactive'}>{/* вот здесь через state будем менять цвет текста */}
                  <ListIcon type="secondary" />
                  <span className={headerStyles.buttonCaption}>Лента заказов</span>
                </div>
              </Link>

            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>

        {/* На будущее:
Логотип в шапке центруктся через space-between, поэтому левая и правая <nav> должны быть примерно одинаковой ширины, но кнопка авторизации чуть уже.
Можно высчитывать ширину кнопки авторизации через js, но пока захардкодено в css. */}
        <nav className={headerStyles.userPanel + ' text text_type_main-default'}>
          <Link className={headerStyles.authButton + ' ' + headerStyles.navlink + '  text_color_inactive'} to="/profile">
            <ProfileIcon type="secondary" />
            <span className={headerStyles.buttonCaption}>Личный кабинет</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
