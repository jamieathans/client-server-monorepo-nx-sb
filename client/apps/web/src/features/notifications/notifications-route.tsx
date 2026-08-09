import { Button, Group } from '@mantine/core';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
  useTitleContext,
} from '@org/shared-ui';
import { useEffect } from 'react';
import { Titles } from '../../titles';

function NotificationsRoute() {
  const titleContext = useTitleContext();

  useEffect(
    function setTitleContext() {
      titleContext.setTitle(Titles.Notifications);

      return () => titleContext.setTitle(null);
    },
    [titleContext],
  );

  return (
    <Group>
      <Button
        onClick={() =>
          showInfoNotification({
            message: 'Info',
          })
        }
      >
        Info
      </Button>
      <Button
        color="teal"
        onClick={() =>
          showSuccessNotification({
            message: 'Success',
          })
        }
      >
        Success
      </Button>
      <Button
        color="yellow"
        onClick={() =>
          showWarningNotification({
            message: 'Warning',
          })
        }
      >
        Warning
      </Button>
      <Button
        color="red"
        onClick={() =>
          showErrorNotification({
            message: 'Error',
          })
        }
      >
        Error
      </Button>
    </Group>
  );
}

export default NotificationsRoute;
