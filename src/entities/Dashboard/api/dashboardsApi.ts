import { api } from 'shared/appApi';

import type {
  TDashboardCard,
  TDashboardCreateRequest,
  TDashboardFull,
} from '../model/dashboardTypes';

const urls = {
  base: '/dashboards',
  properties: '/properties',
  list(user_id: number) {
    return `${urls.base}/owner/${user_id}`;
  },
  item(id: string) {
    return `${urls.base}/${id}`;
  },
};

export const dashboardsApi = {
  getDashboardsList: (user_id: number) =>
    api.get<TDashboardCard[]>(urls.list(user_id)),
  getDashboardItem: (id: string) => api.get<TDashboardFull>(urls.item(id)),
  createDashboard: (dto: TDashboardCreateRequest) => api.post(urls.base, dto),
};
