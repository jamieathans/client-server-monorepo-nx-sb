import { lazy, Suspense, useEffect } from 'react';
import { RootLayout } from '../root-layout/root-layout';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { RoutePaths } from '../route-paths';
//import { CenteredLoader } from '@org/shared-ui';

const NotificationsRoute = lazy(
  () => import('../features/notifications/notifications-route'),
);
const LoadersRoute = lazy(() => import('../features/loaders/loaders-route'));

export function RouteManager() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function redirectToDefaultRoute() {
      if (location.pathname === '/') {
        navigate(`${RoutePaths.Notifications}`, { replace: true });
      }
    },
    [location.pathname, navigate],
  );

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            path={`${RoutePaths.Notifications}`}
            element={<NotificationsRoute />}
          />
          <Route path={`${RoutePaths.Loaders}`} element={<LoadersRoute />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
