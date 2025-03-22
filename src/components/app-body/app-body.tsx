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

import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';

export const AppBody = () => {
  const navigate = useNavigate();
  const modalClose = () => {
    navigate(-1);
  };

  return (
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={modalClose}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={modalClose}>
            <OrderInfo />
          </Modal>
        }
      />
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
          <Modal title='' onClose={modalClose}>
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          </Modal>
        }
      />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
};
