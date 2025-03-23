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

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import { fetchUser } from '../../services/slices/user';
import { resetOrderModal } from '../../services/slices/orders';

import {
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';

export const AppBody = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const background = location.state?.background;

  const modalClose = () => {
    dispatch(resetOrderModal());
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuthOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuthOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute unAuthOnly>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute unAuthOnly>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={modalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={modalClose}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={modalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
