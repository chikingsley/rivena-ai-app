'use client';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import * as React from 'react';

export function ThemeProvider(_props: ThemeProviderProps) {
  const [props, props] = splitProps(_props, ['children']);
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
}
