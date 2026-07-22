import { NotificationData as MantineNotificationData } from '@mantine/notifications';
import { XIcon, CheckIcon, WarningIcon, InfoIcon } from '@phosphor-icons/react';
import { notifications } from '@mantine/notifications';

export type NotificationData = Omit<MantineNotificationData, 'icon' | 'color'>;

export function showInfoNotification(notification: NotificationData) {
  notifications.show({
    icon: <InfoIcon />,
    ...notification,
  });
}

export function showSuccessNotification(notification: NotificationData) {
  notifications.show({
    icon: <CheckIcon />,
    color: 'teal',
    ...notification,
  });
}

export function showWarningNotification(notification: NotificationData) {
  notifications.show({
    icon: <WarningIcon />,
    color: 'yellow',
    ...notification,
  });
}

export function showErrorNotification(notification: NotificationData) {
  notifications.show({
    icon: <XIcon />,
    color: 'red',
    ...notification,
  });
}
