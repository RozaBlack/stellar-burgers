import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { getBurgerIngredientSelector } from '../../services/slices/burger-constructor';
import {
  getOrderRequestSelector,
  getOrderSelector,
  createOrder,
  resetOrderModal
} from '../../services/slices/orders';

import { getUserAuthenticatedSelector } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurgerIngredientSelector);
  const isAuthenticated = useSelector(getUserAuthenticatedSelector);

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      return navigate('/login');
    }

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient.id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
