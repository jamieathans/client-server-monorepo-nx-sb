import { useLogoutMutation } from '@org/shared-ui';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../route-paths';

export function useLogout() {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  function logout() {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await navigate(`/${RoutePaths.Login}`);
        window.location.reload();
      },
    });
  }

  return {
    logoutMutation,
    logout,
  } as const;
}
