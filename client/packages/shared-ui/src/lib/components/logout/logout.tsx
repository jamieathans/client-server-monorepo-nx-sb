import { SignOutIcon } from '@phosphor-icons/react';
import { HeaderIcon } from '../header-icon/header-icon';
import { useLogoutMutation } from '../../mutations/logout-mutation';
import { useNavigate } from 'react-router';

export function Logout() {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  function handleClick() {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await navigate('/');
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
