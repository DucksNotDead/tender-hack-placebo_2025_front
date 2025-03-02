import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { DashboardCard, TDashboardCard } from 'entities/Dashboard';

import { HomePageCreateDashboardForm } from './HomePageCreateDashboardForm';
import Styles from './HomePage.module.scss';
import { DashboardDetail } from 'widgets/DashboardDetail';

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
        value: 12,
        name: 'Индекс Херфиндаля-Хиршмана',
        unit: '',
      },
      {
        value: 6723,
        name: 'Доля побед в КС',
        unit: '%',
      },
      {
        value: 6723,
        name: 'Среднее снижение цены',
        unit: '%',
      },
      {
        value: 6723,
        name: 'Общая выручка',
        unit: 'руб.',
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
  const [selectedCard, setSelectedCard] = useState<TDashboardCard | null>(null);

  const handleCardClick = useCallback((card: TDashboardCard) => {
    setSelectedCard(() => card);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setSelectedCard(() => null);
  }, []);

  return (
    <div className={Styles.main}>
      <div className={Styles.wrapper}>
        {dashboards.map((dashboard) => (
          <DashboardCard
            key={dashboard.id}
            {...dashboard}
            onClick={() => handleCardClick(dashboard)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            animate={{
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(0,0,0,.4)',
            }}
            exit={{
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            className={Styles.cardOverlay}
            onClick={handleOverlayClick}
          >
            <motion.div
              layoutId={`card-${selectedCard.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <DashboardDetail/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <HomePageCreateDashboardForm hidden={!!selectedCard}/>
    </div>
  );
}
