import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import { HeaderIcon } from '../header-icon/header-icon';

export function ColourSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  function handleClick() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <HeaderIcon ariaLabel="Toggle color scheme" onClick={handleClick}>
      {computedColorScheme === 'dark' && <SunIcon />}
      {computedColorScheme === 'light' && <MoonIcon />}
    </HeaderIcon>
  );
}
