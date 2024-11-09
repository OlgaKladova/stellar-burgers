import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/actions';
import { getIngredients } from '../../services/ingredients/actions';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const onClose = () => {
    navigate(-1);
  };
  const num = location.pathname.split('/').pop();
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <OnlyUnAuth>
              <Login />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/register'
          element={
            <OnlyUnAuth>
              <Register />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <OnlyUnAuth>
              <ForgotPassword />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <OnlyUnAuth>
              <ResetPassword />
            </OnlyUnAuth>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <OnlyAuth>
                <Profile />
              </OnlyAuth>
            }
          />
          <Route
            path='orders'
            element={
              <OnlyAuth>
                <ProfileOrders />
              </OnlyAuth>
            }
          />
        </Route>
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth>
              <OrderInfo />
            </OnlyAuth>
          }
        />
        <Route path='/ingredient/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${num}`} onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth>
                <Modal title={`#${num}`} onClose={onClose}>
                  <OrderInfo />
                </Modal>
              </OnlyAuth>
            }
          />
          <Route
            path='/ingredient/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
