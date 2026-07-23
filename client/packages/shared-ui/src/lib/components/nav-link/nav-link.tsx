import { NavLink as RouterNavLink, To } from 'react-router';
import { NavLink as MantineNavLink } from '@mantine/core';
import { ReactNode } from 'react';

export function NavLink({
  label,
  to,
  children,
}: {
  label: ReactNode;
  to: To;
  children?: ReactNode;
}) {
  return (
    <MantineNavLink
      label={label}
      renderRoot={(props) => <RouterNavLink to={to} end {...props} />}
    >
      {children}
    </MantineNavLink>
  );
}
