import { lazy, Suspense, useEffect } from 'react';
import { RootLayout } from '../root-layout/root-layout';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { RoutePaths } from '../route-paths';

const NotificationsRoute = lazy(
  () => import('../features/notifications/notifications-route'),
);

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
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            path={`${RoutePaths.Notifications}`}
            element={<NotificationsRoute />}
          />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
