import { api } from 'shared/appApi';
import { ISupplier } from 'entities/Supplier';

const urls = {
  base: '/utils',
  total_revenue_by_kpgz_category(start_date: string, end_date: string) {
    return `${this.base}/total_revenue_by_kpgz_category/${start_date}/${end_date}/4`;
  },
  revenue_by_regions(
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) {
    return `${this.base}/revenue_by_regions/${supplier_id}/${start_date}/${end_date}/`;
  },
  revenue_trend_by_mounth(
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) {
    return `${this.base}/revenue_trend_by_mounth/${supplier_id}/${start_date}/${end_date}/`;
  },
  revenue_by_customers(
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) {
    return `${this.base}/revenue_by_customers/${supplier_id}/${start_date}/${end_date}/5`;
  },
  supplierId(inn: string) {
    return `suppliers/${inn}`;
  },
};

export const dashboardDetailApi = {
  getSupplierInn: (inn: string) => api.get<ISupplier>(urls.supplierId(inn)),
  total_revenue_by_kpgz_category: (start_date: string, end_date: string) =>
    api.get(urls.total_revenue_by_kpgz_category(start_date, end_date)),
  revenue_by_regions: (
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) => api.get(urls.revenue_by_regions(supplier_id, start_date, end_date)),
  revenue_trend_by_mounth: (
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) => api.get(urls.revenue_trend_by_mounth(supplier_id, start_date, end_date)),
  revenue_by_customers: (
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) => api.get(urls.revenue_by_customers(supplier_id, start_date, end_date)),

  hhi_index: (supplier_id: number, start_date: string, end_date: string) =>
    api.get(
      `/utils/herfindahl_hirschman_index/${supplier_id}/${start_date}/${end_date}`,
    ),
  win_rate: (supplier_id: number, start_date: string, end_date: string) =>
    api.get(
      `/utils/metric_percentage_wins/${supplier_id}/${start_date}/${end_date}`,
    ),
  avg_reduction_percent: (
    supplier_id: number,
    start_date: string,
    end_date: string,
  ) =>
    api.get(
      `/utils/metric_avg_downgrade_cost/${supplier_id}/${start_date}/${end_date}`,
    ),
  my_revenue: (supplier_id: number, start_date: string, end_date: string) =>
    api.get(
      `/utils/metric_total_revenue/${supplier_id}/${start_date}/${end_date}`,
    ),
};
