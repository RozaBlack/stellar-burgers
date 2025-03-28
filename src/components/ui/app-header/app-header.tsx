import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' className={clsx(styles.navlink, 'mr-4', 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='text text_type_main-default ml-2'>
                Конструктор
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to='/feed' className={clsx(styles.navlink, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <ListIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </div>
          )}
        </NavLink>
      </div>
      <Link to='/' className={clsx(styles.link, 'p-8')}>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </Link>
      <div className={styles.link_position_last}>
        <NavLink to='/profile' className={clsx(styles.navlink, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
/*  
<Link to='/' className={clsx(styles.link, 'p-4')}>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </Link>
      */
