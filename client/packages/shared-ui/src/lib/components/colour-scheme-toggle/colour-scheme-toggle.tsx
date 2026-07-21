import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import classes from './colour-scheme-toggle.module.css';

export function ColourSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  function handleClick() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ActionIcon
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      onClick={handleClick}
    >
      {computedColorScheme === 'dark' && <SunIcon className={classes.icon} />}
      {computedColorScheme === 'light' && <MoonIcon className={classes.icon} />}
    </ActionIcon>
  );
}
