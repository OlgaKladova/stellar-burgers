import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getBun,
  getIngredients
} from '../../services/constructor/slice';
import {
  clearOrder,
  getIsLoading,
  getNewOrder
} from '../../services/order/slice';
import { orderBurger } from '../../services/order/actions';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bunUser = useSelector(getBun);
  const ingredientsUser = useSelector(getIngredients);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: bunUser,
    ingredients: ingredientsUser ?? []
  };

  const loading = useSelector(getIsLoading);

  const orderData = useSelector(getNewOrder);
  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      navigate('/login');
    } else {
      if (!constructorItems.bun || orderRequest) return;
      let IdConstructorItems: string[] = [];
      if (constructorItems.bun)
        IdConstructorItems = [...IdConstructorItems, constructorItems.bun._id];
      if (constructorItems.ingredients) {
        const IdIngredients = constructorItems.ingredients.map(
          (item) => item._id
        );
        IdConstructorItems = [...IdConstructorItems, ...IdIngredients];
      }
      dispatch(orderBurger(IdConstructorItems));
    }
  };
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  useEffect(() => {
    setOrderRequest(loading);
    setOrderModalData(orderData);
  }, [orderData, loading]);
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
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
