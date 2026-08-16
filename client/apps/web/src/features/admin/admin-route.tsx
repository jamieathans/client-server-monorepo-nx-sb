import { CenteredLoader, useUserHasRole } from '@org/shared-ui';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { RoutePaths } from '../../route-paths';

function AdminRoute() {
  const { userIsAdmin } = useUserHasRole();
  const navigate = useNavigate();

  useEffect(
    function checkUserIsAdmin() {
      if (userIsAdmin() === undefined) {
        return;
      }

      navigate(userIsAdmin() ? `${RoutePaths.Users}` : '/');
    },
    [navigate, userIsAdmin],
  );

  if (userIsAdmin() === undefined) {
    return <CenteredLoader />;
  }

  return <Outlet />;
}

export default AdminRoute;
