import { NavLink as RouterNavLink, To } from 'react-router';
import { NavLink as MantineNavLink } from '@mantine/core';
import { ReactNode } from 'react';

export function NavLink({ label, to }: { label: ReactNode; to: To }) {
  return (
    <MantineNavLink
      label={label}
      renderRoot={(props) => <RouterNavLink to={to} end {...props} />}
    />
  );
}
