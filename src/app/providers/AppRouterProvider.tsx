import { Navigate, Route, Routes } from 'react-router';
import { JSX, ReactNode } from 'react';

import { appRoutes } from 'shared/appRoutes';
import { useAuth } from 'entities/Auth';
import { HomePage } from 'pages/HomePage';
import { DashboardDetail } from 'widgets/DashboardDetail';

interface IGuardProps {
  children: ReactNode;
  isAuth: boolean;
}

function Guard({ children, isAuth }: IGuardProps) {
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div style={{ width: '100%', height: '100%' }}></div>
      )}
    </>
  );
}

export function AppRouterProvider() {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route
        path={appRoutes.home}
        element={<Guard isAuth={isAuth} children={<HomePage />} />}
      />
      <Route
        path={`${appRoutes.dashboards}/:guid`}
        element={<Guard isAuth={isAuth} children={<DashboardDetail />} />}
      />
      <Route path={'*'} element={<Navigate to={appRoutes.home} />} />
    </Routes>
  );
}
