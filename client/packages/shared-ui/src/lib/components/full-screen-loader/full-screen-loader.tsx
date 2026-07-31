import { Oval } from 'react-loader-spinner';
import classes from './full-screen-loader.module.css';

export function FullScreenLoader() {
  return (
    <div className={classes.root}>
      <Oval
        color="var(--mantine-color-blue-filled)"
        secondaryColor="var(--mantine-color-blue-filled)"
      />
    </div>
  );
}
