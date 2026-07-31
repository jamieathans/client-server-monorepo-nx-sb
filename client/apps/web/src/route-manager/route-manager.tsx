import { lazy, Suspense } from 'react';
import { RootLayout } from '../root-layout/root-layout';
import { Route, Routes } from 'react-router';
import { RoutePaths } from '../route-paths';
import { FullScreenLoader } from '@org/shared-ui';

const NotificationsRoute = lazy(
  () => import('../features/notifications/notifications-route'),
);
const LoadersRoute = lazy(() => import('../features/loaders/loaders-route'));
const LoginRoute = lazy(() => import('../features/login/login-route'));

export function RouteManager() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
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
