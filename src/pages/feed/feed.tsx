import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import {
  getFeedsOrdersSelector,
  fetchFeeds
} from '../../services/slices/feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedsOrdersSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />;
};
