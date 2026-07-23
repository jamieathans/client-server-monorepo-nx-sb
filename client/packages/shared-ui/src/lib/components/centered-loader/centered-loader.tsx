import { Center, Loader } from '@mantine/core';
import classes from './centered-loader.module.css';

export function CenteredLoader() {
  return (
    <Center className={classes.root}>
      <Loader color="blue" size="xl" />
    </Center>
  );
}
