import { Alert, AlertProps } from '@mantine/core';
import { InfoIcon, WarningIcon } from '@phosphor-icons/react';

export function WarningAlert({
  title = 'Warning',
  children,
  ...props
}: AlertProps) {
  return (
    <Alert
      variant="filled"
      color="yellow"
      title={title}
      icon={<WarningIcon />}
      {...props}
    >
      {children}
    </Alert>
  );
}

export function InfoAlert({ title = 'Info', children, ...props }: AlertProps) {
  return (
    <Alert
      variant="filled"
      color="blue"
      title={title}
      icon={<InfoIcon />}
      {...props}
    >
      {children}
    </Alert>
  );
}
