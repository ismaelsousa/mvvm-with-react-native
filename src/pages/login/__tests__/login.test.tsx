import {Alert} from 'react-native';
import {renderHook, act} from '@testing-library/react-hooks';

import MockAdapter from 'axios-mock-adapter';
import {UserModel} from '../../../common/models/user.model';

import client from '../../../repositories/client';
import useLoginViewModel from '../view.model';

const mock = new MockAdapter(client);

test('it should be able to sign in', async () => {
  const user: UserModel = {
    id: '1912391230',
    email: 'ismael.sousa@fleye.com.br',
    name: 'Ismael',
  };
  const pass = 'Ismael123';

  mock.onPost('/sessions').replyOnce(200, user);

  const {result, waitFor} = renderHook(() => useLoginViewModel());

  act(() => {
    result.current.setEmail(user.email);
  });

  await waitFor(() => result.current.email === user.email);

  act(() => {
    result.current.setPassword(pass);
  });

  await waitFor(() => result.current.password === pass);

  act(() => {
    result.current.onSubmit();
  });

  await waitFor(() => result.current.isLoading === false);

  expect(result.current.isLoading).toBe(false);
  expect(result.current.email).toBe(user.email);
  expect(result.current.password).toBe(pass);
  expect(mock.history.post[0].url).toEqual('/sessions');
  expect(mock.history.post[0].data).toEqual(
    JSON.stringify({
      email: user.email,
      password: 'Ismael123',
    }),
  );
  mock.resetHistory();
});

test('it should break on sign in', async () => {
  const email = 'ismael.sousa@fleye.com.br';
  const pass = 'ismael1234';
  mock.onPost('/sessions').reply(401, 'User not found');

  const alert = jest.spyOn(Alert, 'alert');

  const {result, waitFor} = renderHook(() => useLoginViewModel());

  act(() => {
    result.current.setEmail(email);
  });

  await waitFor(() => result.current.email === email);

  act(() => {
    result.current.setPassword(pass);
  });

  await waitFor(() => result.current.password === pass);

  act(() => {
    result.current.onSubmit();
  });

  await waitFor(() => result.current.isLoading === false);

  expect(result.current.isLoading).toBe(false);
  expect(result.current.email).toBe(email);
  expect(result.current.password).toBe(pass);
  expect(mock.history.post[0].url).toEqual('/sessions');
  expect(mock.history.post[0].data).toEqual(
    JSON.stringify({
      email: email,
      password: pass,
    }),
  );
  expect(alert).toHaveBeenCalledWith('Oops!', 'Something went wrong');
  mock.resetHistory();
});
