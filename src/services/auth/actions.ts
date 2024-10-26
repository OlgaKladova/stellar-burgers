import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  getUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { TLoginData, TRegisterData } from '../../utils/burger-api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './slice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    try {
      const response = await loginUserApi({ email, password });
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }: TRegisterData) => {
    const response = await registerUserApi({
      email,
      name,
      password
    });
    if (response.success) {
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ email, name, password }: Partial<TRegisterData>) =>
    updateUserApi({ email, name, password })
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await logoutApi();
  if (response.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return response;
});

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const response = await getUserApi();
        dispatch(setUser(response.user));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
