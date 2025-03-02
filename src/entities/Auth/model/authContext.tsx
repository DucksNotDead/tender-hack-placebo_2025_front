import { createContext } from 'react';

import { TAuthContextValue } from './authTypes';

export const authDefaultContextValue: TAuthContextValue = {
  isAuth: false,
  user: null,
  login: () => {},
  logout: () => {},
  setUserSupplierId: () => {}
};

export const authContext = createContext<TAuthContextValue>(
  authDefaultContextValue,
);
