import { api } from 'shared/appApi';

const urls = {
  base: '/utils',
  total_revenue_by_kpgz_category(start_date: string, end_date: string) {
    return `${this.base}/total_revenue_by_kpgz_category/${start_date}/${end_date}/4`;
  },
  evenue_by_regions(start_date: string, end_date: string) {
    return `${this.base}/total_revenue_by_kpgz_category/${start_date}/${end_date}/4`;
  },
};

export const dashboardDetailApi = {
  total_revenue_by_kpgz_category: (start_date: string, end_date: string) =>
    api.get(urls.total_revenue_by_kpgz_category(start_date, end_date)),
};
