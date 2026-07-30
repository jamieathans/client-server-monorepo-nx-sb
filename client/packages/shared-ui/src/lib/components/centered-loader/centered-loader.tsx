import { Center, Loader } from '@mantine/core';
import classes from './centered-loader.module.css';
import { clsx } from 'clsx';

export function CenteredLoader({
  fullScreen,
  className,
  classNames,
}: {
  fullScreen?: boolean;
  className?: boolean;
  classNames?: {
    root?: string;
    loader?: string;
  };
}) {
  return (
    <Center
      className={clsx(
        classes.root,
        className,
        classNames?.root,
        fullScreen && classes.fullScreen,
      )}
    >
      <Loader color="blue" size="xl" className={clsx(classNames?.loader)} />
    </Center>
  );
}
