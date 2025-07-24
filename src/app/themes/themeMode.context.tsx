'use client';
import { createContext, useContext } from 'react';

export const ThemeModeContext = createContext<'light' | 'dark'>('light');

export const useThemeMode = () => useContext(ThemeModeContext);
