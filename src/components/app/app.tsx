import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, AppBody } from '@components';
import { BrowserRouter } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingridients';
import { getUser } from '../../services/slices/user';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <AppBody />
      </BrowserRouter>
    </div>
  );
};

export default App;
