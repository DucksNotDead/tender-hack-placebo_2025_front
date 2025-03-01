import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';
import { useEffect } from 'react';

import { appRoutes } from 'shared/appRoutes';
import { AuthPage } from 'pages/AuthPage';
import { DashboardPage } from 'pages/DashboardPage';
import { useAuth } from 'entities/Auth';
import { TestReportPage } from 'pages/TestReportPage';

export function AppRouterProvider() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth && pathname !== appRoutes.auth) navigate(appRoutes.auth);
    else if (isAuth && pathname === appRoutes.auth) navigate(appRoutes.home);
  }, [isAuth, navigate]);

  return (
    <Routes>
      {isAuth && (
        <>
          <Route path={appRoutes.home} element={<TestReportPage />} />
          <Route
            path={`${appRoutes.dashboard}/:guid`}
            element={<DashboardPage />}
          />
        </>
      )}
      <Route path={appRoutes.auth} element={<AuthPage />} />
      <Route path={'*'} element={<Navigate to={appRoutes.home} />} />
    </Routes>
  );
}
