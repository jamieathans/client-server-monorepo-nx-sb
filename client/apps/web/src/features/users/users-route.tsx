import { useTitleContext } from '@org/shared-ui';
import { useEffect } from 'react';
import { Titles } from '../../titles';

function UsersRoute() {
  const titleContext = useTitleContext();

  useEffect(
    function setTitleContext() {
      titleContext.setTitle(Titles.Users);

      return () => titleContext.setTitle(null);
    },
    [titleContext],
  );

  return <>Users table here</>;
}

export default UsersRoute;
