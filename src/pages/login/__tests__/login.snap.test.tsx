/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import LoginView from '../view';

jest.mock('../view.model', () => {
  const fnLoginViewModel = jest.fn();

  fnLoginViewModel.mockImplementation(() => ({
    email: '',
    setEmail: jest.fn(),
    password: '',
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  }));
  return fnLoginViewModel;
});

import useLoginViewModel from '../view.model';

it('renders correctly', () => {
  const {toJSON} = renderer.create(<LoginView />);

  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly with email', () => {
  useLoginViewModel.mockImplementation(() => ({
    email: 'ismael.sousa@fleye.com.br',
    setEmail: jest.fn(),
    password: '',
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  }));
  const tree = renderer.create(<LoginView />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with password', () => {
  useLoginViewModel.mockImplementation(() => ({
    email: '',
    setEmail: jest.fn(),
    password: '123456',
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  }));
  const tree = renderer.create(<LoginView />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with email and password', () => {
  useLoginViewModel.mockImplementation(() => ({
    email: 'ismael.sousa@fleye.com.br',
    setEmail: jest.fn(),
    password: '123456',
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  }));
  const tree = renderer.create(<LoginView />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly while loading', () => {
  useLoginViewModel.mockImplementation(() => ({
    email: 'ismael.sousa@fleye.com.br',
    setEmail: jest.fn(),
    password: '123456',
    setPassword: jest.fn(),
    isLoading: true,
    onSubmit: jest.fn(),
  }));
  const tree = renderer.create(<LoginView />).toJSON();
  expect(tree).toMatchSnapshot();
});
