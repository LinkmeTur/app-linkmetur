'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Suspense, useEffect, useState } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import LinearProgress from '@mui/material/LinearProgress';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { themeDark, themelight } from './themes/theme.light';
import { usePathname } from 'next/navigation';
import {
    LinkMeTurNavigationT,
    LinkMeTurNavigationP,
} from './config/navigation/linkMeTurNavigation';
import useStore, { persistor } from './store/store';
import Image from 'next/image';
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey(
    '1919867ea7d28016281f8bfff8ea8d58Tz02NDc0LEU9MjAwMzc4MTg0ODAwMCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

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

const istheme = {
    setTheme: (value: string) => window.localStorage.setItem('toolpad-mode', value),
    getTheme: () => window.localStorage.getItem('toolpad-mode'),
};

export function LinkMeTurAppProvider({ children }: { children: React.ReactNode }) {
    const [thisTheme, setThisTheme] = useState<Theme>(themeDark);
    const [showLayoutDashboard, setShowLayoutDashboard] = useState<boolean>(false);

    const [dashboardLayoutNavigation, setDashboardLayoutNavigation] =
        useState(LinkMeTurNavigationP);

    const pathname = usePathname();

    useEffect(() => {
        const themeMode = istheme.getTheme();
        if (!themeMode) {
            detectDarkMode((isDarkMode) =>
                isDarkMode ? istheme.setTheme('dark') : istheme.setTheme('light'),
            );
        } else if (themeMode === 'dark') {
            setThisTheme(themeDark);
        } else {
            setThisTheme(themelight);
        }
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem('tipo') === 'T') {
            setDashboardLayoutNavigation(LinkMeTurNavigationT);
        } else {
            setDashboardLayoutNavigation(LinkMeTurNavigationP);
        }
        const show = dashboardLayoutNavigation.findIndex(
            (s) => pathname === '/' + s.segment || pathname.includes(`/${s.segment}/`),
        );

        if (show >= 0) {
            setShowLayoutDashboard(true);
        } else {
            setShowLayoutDashboard(false);
        }
    }, [pathname]);
    return (
        <Provider store={useStore}>
            <PersistGate loading={null} persistor={persistor}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={thisTheme}>
                        <Suspense fallback={<LinearProgress />}>
                            {showLayoutDashboard ? (
                                <NextAppProvider
                                    navigation={dashboardLayoutNavigation}
                                    theme={{ dark: themeDark, light: themelight }}
                                >
                                    <DashboardLayout
                                        branding={{
                                            title: `${
                                                dashboardLayoutNavigation.find(
                                                    (l) => '/' + l.segment === pathname,
                                                )?.title
                                            }`,
                                            logo: (
                                                <Image
                                                    src='/logoblackp.svg'
                                                    alt='Logo'
                                                    width={200}
                                                    height={200}
                                                />
                                            ),
                                        }}
                                        slots={{}}
                                    >
                                        {children}
                                    </DashboardLayout>
                                </NextAppProvider>
                            ) : (
                                <ThemeProvider theme={themelight}>
                                    <CssBaseline />
                                    {children}
                                </ThemeProvider>
                            )}
                        </Suspense>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </PersistGate>
        </Provider>
    );
}
