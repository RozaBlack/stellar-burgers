import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  getUserAuthenticatedSelector,
  getUserIsAuthCheckedSelector
} from '../../services/slices/user';

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getUserIsAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const isAuthenticated = useSelector(getUserAuthenticatedSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!unAuthOnly && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuthOnly && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
