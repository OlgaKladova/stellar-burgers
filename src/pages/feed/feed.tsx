import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedSelector, getIsLoading } from '../../services/feed/slice';
import { getFeeds } from '../../services/feed/actions';
import { useParams } from 'react-router-dom';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getFeedSelector);
  const isLoading = useSelector(getIsLoading);
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };
  if (!orders.length && isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
