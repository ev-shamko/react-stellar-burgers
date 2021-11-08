import React, { FC } from 'react';
import styles from './profile-tab.module.css';
import { TProfileMenuTabsValue } from '../../utils/types';

type TProfileTabProps = {
  value: TProfileMenuTabsValue,
  isActive: boolean,
  onClick: (tabName: TProfileMenuTabsValue) => void,
};

// написан по аналогии с <Tab> из пакета от Практикума
export const ProfileTab: FC<TProfileTabProps> = ({ children, value, isActive, onClick: handleClick}) => { 
  const className = `${styles.tab} ${isActive ? styles.tab_type_current : ''}`;

  const onClick = React.useCallback(() => {
    if (typeof handleClick === 'function' && !isActive ) {
      handleClick(value);
    }
  }, [handleClick, value, isActive]);

  return (
    <div className={`${className} pt-4 pr-10 pb-4 noselect`} onClick={onClick}>
      <span className="text text_type_main-medium">{children}</span>
    </div>
  );
};