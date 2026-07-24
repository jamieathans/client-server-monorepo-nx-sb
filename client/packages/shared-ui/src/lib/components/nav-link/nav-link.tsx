import { NavLink as RouterNavLink, To } from 'react-router';
import { NavLink as MantineNavLink } from '@mantine/core';
import { ReactNode } from 'react';

export function NavLink({
  label,
  to,
  children,
  onClick,
}: {
  label: ReactNode;
  to: To;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <MantineNavLink
      label={label}
      renderRoot={(props) => <RouterNavLink to={to} end {...props} />}
      onClick={onClick}
    >
      {children}
    </MantineNavLink>
  );
}
