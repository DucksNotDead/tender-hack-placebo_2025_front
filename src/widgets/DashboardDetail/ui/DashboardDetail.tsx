import { useState } from 'react';

import { TDashboardFull } from 'entities/Dashboard';

import { DashboardDetailMetricsSection } from './DashboardDetailMetricsSection';
import { DashboardDetailFiltersSection } from './DashboardDetailFiltersSection';
import { DashboardDetailChartsSection } from './DashboardDetailChartsSection';
import Styles from './DashboardDetail.module.scss';

// const dashboard: TDashboardFull = {
//   id: '123',
//   title: 'Дашборд',
//   owner: {
//     id: 1,
//     full_name: 'Михайлов Даниил Александрович',
//     email: 'mikhaylov_danilka03@mail.ru',
//     supplier_id: 1,
//   },
//   charts: [
//     {
//       type: 'bar',
//       data: [{ name: 'Prop1', values: [1, 4, 2] }],
//       categories: ['1', '2', '3'],
//     },
//   ],
//   metrics: [
//     {
//       id: 1,
//       value: 4789.05,
//       name: 'Индекс Херфиндаля-Хиршмана',
//       unit: '',
//     },
//     {
//       id: 2,
//       value: 55.2,
//       name: 'Доля побед в КС',
//       unit: '%',
//     },
//     {
//       id: 3,
//       value: 1052070,
//       name: 'Выручка',
//       unit: 'руб.',
//     },
//     {
//       id: 4,
//       value: 4529.78,
//       name: 'Среднее снижение цены КС',
//       unit: 'руб.',
//     },
//   ],
//   properties: [],
//   subscribers: [
//     {
//       full_name: 'Михайлов Даниил Александрович',
//       email: 'mikhaylov_danilka03@mail.ru',
//       id: 1,
//       supplier_id: 1,
//     },
//     {
//       full_name: 'Холуенко Александр Юрьевич',
//       email: 'zerogormy@mail.ru',
//       id: 2,
//       supplier_id: 2,
//     },
//   ],
//   filters: {
//     start_date: '2023-02-20',
//     end_date: '2024-02-28',
//   },
// };

export function DashboardDetail() {
  const [filters, setFilters] = useState<TDashboardFull['filters']>({
    start_date: '1990-01-01',
    end_date: '2025-01-01',
  });

  return (
    <div className={Styles.main}>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <DashboardDetailMetricsSection filters={filters} />
        <DashboardDetailFiltersSection
          filters={filters}
          onChange={setFilters}
        />
        <DashboardDetailChartsSection filters={filters} />
      </div>
    </div>
  );
}
