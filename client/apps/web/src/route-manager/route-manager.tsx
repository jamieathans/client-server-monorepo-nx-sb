import { lazy, Suspense } from 'react';
import { RootLayout } from '../root-layout/root-layout';
import { Route, Routes } from 'react-router';
import { RoutePaths } from '../route-paths';
import { Oval } from 'react-loader-spinner';
import classes from './router-manager.module.css';

const NotificationsRoute = lazy(
  () => import('../features/notifications/notifications-route'),
);
const LoadersRoute = lazy(() => import('../features/loaders/loaders-route'));
const LoginRoute = lazy(() => import('../features/login/login-route'));

function SuspenseFallback() {
  return (
    <div className={classes.suspenseFallbackContainer}>
      <Oval
        color="var(--mantine-color-blue-filled)"
        secondaryColor="var(--mantine-color-blue-filled)"
      />
    </div>
  );
}

export function RouteManager() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(
  //   function redirectToDefaultRoute() {
  //     if (location.pathname === '/') {
  //       navigate(`${RoutePaths.Notifications}`, { replace: true });
  //     }
  //   },
  //   [location.pathname, navigate],
  // );

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            path={`${RoutePaths.Notifications}`}
            element={<NotificationsRoute />}
          />
          <Route path={`${RoutePaths.Loaders}`} element={<LoadersRoute />} />
        </Route>
        <Route path={`/${RoutePaths.Login}`} element={<LoginRoute />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
