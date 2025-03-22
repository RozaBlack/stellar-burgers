import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeBurgerInredient,
  moveBurgerIngredient
} from '../../services/slices/burger-constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveBurgerIngredient({ ingredient: ingredient, moveUp: false }));
    };

    const handleMoveUp = () => {
      dispatch(moveBurgerIngredient({ ingredient: ingredient, moveUp: true }));
    };

    const handleClose = () => {
      dispatch(removeBurgerInredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
