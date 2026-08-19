import { HeaderIcon } from '@org/shared-ui';
import { SignOutIcon } from '@phosphor-icons/react';
import { useLogout } from './use-logout';

export function Logout() {
  const { logout, logoutMutation } = useLogout();

  return (
    <HeaderIcon
      ariaLabel="Logout"
      onClick={logout}
      disabled={logoutMutation.isPending}
    >
      <SignOutIcon />
    </HeaderIcon>
  );
}
