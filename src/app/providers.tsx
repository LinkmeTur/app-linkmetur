'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Suspense, useEffect, useState } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import LinearProgress from '@mui/material/LinearProgress';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { themeDark, themelight } from './themes/theme.light';
import { usePathname } from 'next/navigation';
import LinkMeTurNavigation from './config/navigation/linkMeTurNavigation';

const detectDarkMode = (callback: (isDark: boolean) => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
        callback(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Executa inicialmente
    callback(mediaQuery.matches);

    return () => {
        mediaQuery.removeEventListener('change', handleChange);
    };
};

export function LinkMeTurAppProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState<boolean>(false);
    const pathname = usePathname();
    const shouldShowLayoutDashboard =
        pathname !== '/' &&
        pathname !== '/signin' &&
        pathname !== '/register' &&
        pathname !== '/recover-pass';

    useEffect(() => {
        detectDarkMode((isDarkMode) => setIsDark(isDarkMode));
    }, []);
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={isDark ? themeDark : themelight}>
                <Suspense fallback={<LinearProgress />}>
                    <NextAppProvider
                        navigation={LinkMeTurNavigation}
                        theme={{ dark: themeDark, light: themelight }}
                    >
                        {shouldShowLayoutDashboard ? (
                            <DashboardLayout>{children}</DashboardLayout>
                        ) : (
                            <ThemeProvider theme={themelight}>
                                <CssBaseline />
                                {children}
                            </ThemeProvider>
                        )}
                    </NextAppProvider>
                </Suspense>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
