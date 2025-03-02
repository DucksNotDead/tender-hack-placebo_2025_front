import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { DashboardCard, TDashboardCard } from 'entities/Dashboard';
import { appRoutes } from 'shared/appRoutes';

import { HomePageCreateDashboardForm } from './HomePageCreateDashboardForm';
import Styles from './HomePage.module.scss';

const dashboards: TDashboardCard[] = [
  {
    id: '123',
    title: 'Дашборд',
    owner: {
      id: 1,
      full_name: 'Михайлов Даниил Александрович',
      email: 'mikhaylov_danilka03@mail.ru',
      supplier_id: 1,
    },
    mainChart: {
      type: 'bar',
      data: [{ name: 'Prop1', values: [1, 4, 2] }],
      categories: ['1', '2', '3'],
    },
    metrics: [
      {
        id: 1,
        value: 12,
        name: 'Перовое поле',
        unit: '%',
      },
      {
        id: 2,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 3,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 4,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 5,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
    ],
    properties: [],
    subscribers: [
      {
        full_name: 'Михайлов Даниил Александрович',
        email: 'mikhaylov_danilka03@mail.ru',
        id: 1,
        supplier_id: 1,
      },
      {
        full_name: 'Холуенко Александр Юрьевич',
        email: 'zerogormy@mail.ru',
        id: 2,
        supplier_id: 2,
      },
    ],
  },
];

export function HomePage() {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (id: string) => {
      navigate(`${appRoutes.dashboards}/${id}`);
    },
    [navigate],
  );

  return (
    <div className={Styles.main}>
      <div className={Styles.wrapper}>
        {dashboards.map((dashboard) => (
          <DashboardCard
            key={dashboard.id}
            {...dashboard}
            onClick={() => handleCardClick(dashboard.id)}
          />
        ))}
      </div>
      <HomePageCreateDashboardForm />
    </div>
  );
}
