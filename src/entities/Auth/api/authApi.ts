import { api } from 'shared/appApi';
import { IAuthCredits, IAuthUser } from 'entities/Auth';

import { IAuthLoginResponse } from '../model/authTypes';

const urls = {
  auth: '/auth',
  login: '/login',
};

export const authApi = {
  auth: (token: string) => api.post<IAuthUser>(urls.auth, { token }),
  login: (credits: IAuthCredits) =>
    api.post<IAuthLoginResponse>(urls.login, credits),
};
