import { Button, Group } from '@mantine/core';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
} from '@org/shared-ui';

function NotificationsRoute() {
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
