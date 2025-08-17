import store, { rootReducer } from './store';

test('Проверка работы rootReducer', () => {
  const newStore = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(newStore).toEqual(store.getState());
});
