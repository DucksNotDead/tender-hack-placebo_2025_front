import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  authContext,
  authDefaultContextValue,
  TAuthValue,
} from 'entities/Auth';
import { authApi } from 'entities/Auth/api/authApi';
import { useInstance } from 'shared/useInstance';
import { appMessages } from 'shared/appMessages';
import { appConst } from 'shared/appConst';

interface IProps {
  children: ReactNode;
}

export function AppAuthProvider({ children }: IProps) {
  const { message } = useInstance();

  const [authValue, setAuthValue] = useState<TAuthValue>(
    authDefaultContextValue,
  );

  const localToken = useMemo(() => {
    return window.localStorage.getItem(appConst.token);
  }, [window.localStorage.getItem(appConst.token)]);

  const setLocalToken = useCallback(
    (token: string | null) => {
      if (token) {
        window.localStorage.setItem(appConst.token, token);
      } else {
        window.localStorage.removeItem(appConst.token);
      }
    },
    [window.localStorage],
  );

  const logout = useCallback(() => {
    setLocalToken(null);
    setAuthValue(() => authDefaultContextValue)
  }, [setLocalToken]);

  const { mutate: auth } = useMutation({
    mutationKey: ['auth', message, logout],
    mutationFn: authApi.auth,
    onSuccess: ({ data }) => {
      setAuthValue(() => ({
        isAuth: true,
        user: data,
      }));
    },
    onError: () => {
      void message.error(appMessages.authError);
      logout();
    },
  });

  const { mutate: login } = useMutation({
    mutationKey: ['login', setLocalToken, message, logout],
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      setLocalToken(data.access_token);
    },
    onError: () => {
      void message.error(appMessages.loginError);
      logout();
    },
  });

  useEffect(() => {
    if (localToken) {
      auth(localToken);
    }
  }, [localToken, auth]);

  return (
    <authContext.Provider value={{ ...authValue, login, logout }}>
      {children}
    </authContext.Provider>
  );
}
