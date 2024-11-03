import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/orders/actions';
import { getIsLoading, getOrdersSelector } from '../../services/orders/slice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const isLoading = useSelector(getIsLoading);
  if (isLoading) return <Preloader />;
  return <ProfileOrdersUI orders={orders} />;
};
