import React from "react";
import headerStyles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


//console.log(styles);

class AppHeader extends React.Component {
    render() {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.hc}>
                    <nav className={headerStyles.nav}>
                        <ul className={headerStyles.ul}>
                            <li className='text text_type_main-default'>
                                <div className={headerStyles.ul}>
                                    <BurgerIcon type="primary" />
                                    <span className={headerStyles.icon + ' ' + 'text text_type_main-small'}>Конструктор</span>
                                </div>
                            </li>
                            <li className='text text_type_main-default'>
                                <div className={headerStyles.ul}>
                                    <ListIcon type="secondary" />
                                    <span className={headerStyles.icon + ' ' + 'text text_type_main-small  text_color_inactive'}>Лента заказов</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <a>
                        <Logo />
                    </a>

                    {/* На будущее:
Логотип в шапке центруктся через space-between, поэтому левая и правая <nav> должны быть одинаковой ширины.
Можно кнопке личного кабинета (которая справа от логотипа) через js задать min-width,
равный ширине меню (которое слева от логотипа). Мало ли что там в мобильной версии потом будет/
Предварительно: для захардкоденной ширины лучше сделать @media и уменьшать при уменьшении ширины экрана, а то шапка резинится не очень
Прямо сейчас ширина кнопки авторизации захардкодена */}

                    <nav className={headerStyles.userPanel}>
                        <div className={headerStyles.ul}>
                            <ProfileIcon type="secondary" />
                            <span className={headerStyles.icon + ' ' + 'text text_type_main-small  text_color_inactive'}>Личный кабинет</span>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default AppHeader;
