import { CenteredLoader, useTitleContext } from '@org/shared-ui';
import { useEffect } from 'react';
import { Titles } from '../../titles';

function LoadersRoute() {
  const titleContext = useTitleContext();

  useEffect(
    function setTitleContext() {
      titleContext.setTitle(Titles.Loaders);

      return () => titleContext.setTitle(null);
    },
    [titleContext],
  );

  return <CenteredLoader />;
}

export default LoadersRoute;
