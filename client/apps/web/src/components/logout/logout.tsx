import { HeaderIcon, useLogoutMutation } from '@org/shared-ui';
import { SignOutIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../route-paths';

export function Logout() {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  function handleClick() {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await navigate(`/${RoutePaths.Login}`);
        window.location.reload();
      },
    });
  }

  return (
    <HeaderIcon
      ariaLabel="Logout"
      onClick={handleClick}
      disabled={logoutMutation.isPending}
    >
      <SignOutIcon />
    </HeaderIcon>
  );
}
