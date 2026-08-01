import { useEffect } from 'react';
import { useApplicationNeedsRefresh } from './use-application-needs-refresh';
import { showWarningNotification } from '../utils/notifications';

export function useShowNotificationIfApplicationNeedsRefresh() {
  const { needsRefresh } = useApplicationNeedsRefresh();

  useEffect(() => {
    if (needsRefresh) {
      showWarningNotification({
        title: 'Application Refresh Required',
        message:
          'Please refresh the application by clicking the browser refresh button.',
        allowClose: false,
        withCloseButton: false,
        autoClose: false,
      });
    }
  }, [needsRefresh]);
}
