import { api } from 'shared/appApi';

import { TSuppliersSuccessRateResponse } from '../model/testReportPageTypes';

const urls = {
  base: '/utils',
  suppliersSuccessRate() {
    return `${this.base}/suppliers_success_rate`
  }
}

export const testReportPageApi = {
  getSuppliersSuccessRate: () => api.get<TSuppliersSuccessRateResponse>(urls.suppliersSuccessRate())
}