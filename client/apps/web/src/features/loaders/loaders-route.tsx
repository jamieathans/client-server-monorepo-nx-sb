import { CenteredLoader, useTitleContext } from '@org/shared-ui';
import { useEffect } from 'react';
import { Titles } from '../../titles';

function LoadersRoute() {
  const titleContext = useTitleContext();

  useEffect(
    function setTitleContext() {
      titleContext.setTitle(Titles.Loaders);
    },
    [titleContext],
  );

  return <CenteredLoader />;
}

export default LoadersRoute;
