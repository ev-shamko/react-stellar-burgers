import React from "react";
import headerStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
    render() {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.headerContainer}>
                    <nav className='text text_type_main-default'>
                        <ul className={headerStyles.navBurgerBuilder}>
                            <li className={headerStyles.headerButton}>
                                <div className={headerStyles.navButton}>
                                    <BurgerIcon type="primary" />
                                    <span className={headerStyles.buttonCaption}>Конструктор</span>
                                </div>
                            </li>
                            <li className={headerStyles.headerButton}>
                                <div className={headerStyles.navButton + '  text_color_inactive'}>{/* вот здесь через state будем менять цвет текста */}
                                    <ListIcon type="secondary" />
                                    <span className={headerStyles.buttonCaption}>Лента заказов</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <a href="#">
                        <Logo />
                    </a>

                    {/* На будущее:
Логотип в шапке центруктся через space-between, поэтому левая и правая <nav> должны быть примерно одинаковой ширины, но кнопка авторизации чуть уже.
Можно высчитывать ширину кнопки авторизации через js, но пока захардкодено в css. */}
                    <nav className={headerStyles.userPanel + ' ' + 'text text_type_main-default'}>
                        <div className={headerStyles.authButton + '  text_color_inactive'}> 
                            <ProfileIcon type="secondary" />
                            <span className={headerStyles.buttonCaption}>Личный кабинет</span>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default AppHeader;
