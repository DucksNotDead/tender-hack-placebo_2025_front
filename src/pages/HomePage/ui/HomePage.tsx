import { DashboardCard, TDashboardCard } from 'entities/Dashboard';

import Styles from './HomePage.module.scss';

const dashboards: TDashboardCard[] = [
  {
    id: '123',
    title: 'Дашборд',
    owner: {
      "id": 1,
      "full_name": "Михайлов Даниил Александрович",
      "email": "mikhaylov_danilka03@mail.ru",
      "supplier_id": 1,
    },
    mainChart: {
      type: 'bar',
      data: [{ name: 'Prop1', values: [1, 4, 2] }],
      categories: ['1', '2', '3'],
    },
    metrics: [],
    properties: [],
    subscribers: [],
  },
];

export function HomePage() {
  return (
    <div className={Styles.main}>
      <div className={Styles.wrapper}>
        {dashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} {...dashboard} />
        ))}
      </div>
    </div>
  );
}
