import { configureStore } from '@reduxjs/toolkit';
import { authSlice, setIsAuthChecked, setUser } from './slice';
import { loginUser, logout, registerUser, updateUser } from './actions';

describe('Проверка редьюсера authSlice', () => {
  test('обработка экшена setUser', () => {
    const initialState = {
      user: null,
      isAuthChecked: true,
      error: null,
      isLoading: false
    };
    const newState = authSlice.reducer(
      initialState,
      setUser({
        email: 'tfdrtx@example.com',
        name: 'Test'
      })
    );
    const { user } = newState;
    expect(user).toEqual({
      email: 'tfdrtx@example.com',
      name: 'Test'
    });
  });

  test('обработка экшена setIsAuthChecked', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      error: null,
      isLoading: false
    };
    const newState = authSlice.reducer(initialState, setIsAuthChecked(true));
    const { isAuthChecked } = newState;
    expect(isAuthChecked).toBe(true);
  });

  describe('обработка экшена loginUser', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(loginUser.pending('', { email: '', password: '' }));
      const { isLoading } = store.getState().auth;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        success: true,
        user: {
          email: 'tfdrtx@example.com',
          name: 'Test'
        },
        refreshToken: 'lkesgfo7v',
        accessToken: 'kfygcir'
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });

      await store.dispatch(
        loginUser.fulfilled(expectedResult, '', { email: '', password: '' })
      );
      const { user, isLoading } = store.getState().auth;
      expect(user).toEqual(expectedResult.user);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(
        loginUser.rejected(Error('error'), '', { email: '', password: '' })
      );
      const { isLoading, error } = store.getState().auth;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена registerUser', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(
        registerUser.pending('', { email: '', password: '', name: '' })
      );
      const { isLoading } = store.getState().auth;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        success: true,
        user: {
          email: 'tfdrtx@example.com',
          name: 'Test'
        },
        refreshToken: 'lkesgfo7v',
        accessToken: 'kfygcir'
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });

      await store.dispatch(
        registerUser.fulfilled(expectedResult, '', {
          email: '',
          password: '',
          name: ''
        })
      );
      const { user, isLoading } = store.getState().auth;
      expect(user).toEqual(expectedResult.user);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(
        registerUser.rejected(Error('error'), '', {
          email: '',
          password: '',
          name: ''
        })
      );
      const { isLoading, error } = store.getState().auth;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена updateUser', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(
        updateUser.pending('', { email: '', password: '', name: '' })
      );
      const { isLoading } = store.getState().auth;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        success: true,
        user: {
          email: 'tfdrtx@example.com',
          name: 'Test'
        }
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });

      await store.dispatch(
        updateUser.fulfilled(expectedResult, '', {
          email: '',
          password: '',
          name: ''
        })
      );
      const { user, isLoading } = store.getState().auth;
      expect(user).toEqual(expectedResult.user);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(
        updateUser.rejected(Error('error'), '', {
          email: '',
          password: '',
          name: ''
        })
      );
      const { isLoading, error } = store.getState().auth;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена logout', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(logout.pending(''));
      const { isLoading } = store.getState().auth;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        success: true
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });

      await store.dispatch(logout.fulfilled(expectedResult, ''));
      const { user, isLoading } = store.getState().auth;
      expect(user).toBeNull();
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { auth: authSlice.reducer }
      });
      await store.dispatch(logout.rejected(Error('error'), ''));
      const { isLoading, error } = store.getState().auth;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });
});
