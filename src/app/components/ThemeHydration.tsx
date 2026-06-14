// src/app/components/ThemeHydration.tsx
'use client';

import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeHydration() {
  const { theme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }, [theme]);

  return null;
}
