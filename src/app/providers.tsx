'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, Divider, IconButton, Theme, ThemeProvider, Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Fragment, JSX, useEffect, useState } from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
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
import LinkmeTurAppBar from './components/appBar/appbar';
import { IoMoon, IoSunny } from 'react-icons/io5';
import SuspenseFallback from './supense-fallback';
import { ThemeModeContext } from './themes/themeMode.context';

LicenseInfo.setLicenseKey(
    '1919867ea7d28016281f8bfff8ea8d58Tz02NDc0LEU9MjAwMzc4MTg0ODAwMCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

export function LinkMeTurAppProvider({ children }: { children: React.ReactNode }) {
    const [thisTheme, setThisTheme] = useState<Theme>(themeDark);
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const [logo, setLogo] = useState<boolean>(false);
    const [logoPath, setLogoPath] = useState<string>('/');
    const [showLayoutDashboard, setShowLayoutDashboard] = useState<boolean>(false);

    const [dashboardLayoutNavigation, setDashboardLayoutNavigation] = useState<
        Array<{
            segment?: string;
            title: string;
            icon: JSX.Element;
            children?: Array<{
                segment: string;
                title: string;
                icon: JSX.Element;
            }>;
        }>
    >(LinkMeTurNavigationP);
    const [titleTab, setTitleTab] = useState('');

    const pathname = usePathname();
    const detectDarkMode = (callback: (isDark: boolean) => void) => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event: MediaQueryListEvent) => {
            event.preventDefault();
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

    useEffect(() => {
        const themeMode = istheme.getTheme();
        if (!themeMode) {
            detectDarkMode((isDarkMode) =>
                isDarkMode ? istheme.setTheme('dark') : istheme.setTheme('light'),
            );
        } else if (themeMode === 'dark') {
            setLogo(false);
            setThisTheme(themeDark);
            setThemeMode('dark');
        } else {
            setLogo(true);
            setThisTheme(themelight);
            setThemeMode('light');
        }
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem('tipo') === 'T') {
            setDashboardLayoutNavigation(LinkMeTurNavigationT);
        } else {
            setDashboardLayoutNavigation(LinkMeTurNavigationP);
        }
        const show = dashboardLayoutNavigation.findIndex(
            (s) =>
                pathname === '/' + s.segment ||
                pathname.includes(`/${s.segment}/`) ||
                (!s.segment && s.children?.map((c) => '/' + c.segment).includes(pathname)),
        );

        if (show < 0) {
            setShowLayoutDashboard(false);
            return;
        }

        setShowLayoutDashboard(true);
        const page = dashboardLayoutNavigation[show];
        if (pathname === '/' + page.segment) {
            setLogoPath('/');
            setTitleTab(page.title);
        } else if (page.children) {
            const child = page.children.find((c) => '/' + c.segment === pathname)?.title;
            setLogoPath('../');
            setTitleTab(child ?? '');
        } else {
            setTitleTab('');
        }
    }, [dashboardLayoutNavigation, pathname]);
    return (
        <ThemeModeContext.Provider value={themeMode}>
            <Provider store={useStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        {showLayoutDashboard ? (
                            <ThemeProvider theme={thisTheme}>
                                <NextAppProvider
                                    navigation={dashboardLayoutNavigation}
                                    theme={{ dark: themeDark, light: themelight }}
                                >
                                    <SuspenseFallback>
                                        <DashboardLayout
                                            defaultSidebarCollapsed
                                            branding={{
                                                title: `${titleTab}`,
                                                logo: (
                                                    <Image
                                                        src={
                                                            !logo
                                                                ? logoPath + 'logoblackp.svg'
                                                                : logoPath + 'logoWhitep.svg'
                                                        }
                                                        alt='Logo'
                                                        width={150}
                                                        height={100}
                                                        style={{
                                                            objectFit: 'contain',
                                                            height: 'auto',
                                                            width: 'auto',
                                                        }}
                                                    />
                                                ),
                                            }}
                                            slots={{
                                                toolbarActions: () => (
                                                    <Fragment>
                                                        <LinkmeTurAppBar />
                                                        <IconButton
                                                            onClick={() => {
                                                                if (istheme.getTheme() === 'dark') {
                                                                    istheme.setTheme('light');
                                                                    setLogo(true);
                                                                    setThisTheme(themelight);
                                                                    setThemeMode('light');
                                                                } else {
                                                                    istheme.setTheme('dark');
                                                                    setLogo(false);
                                                                    setThisTheme(themeDark);
                                                                    setThemeMode('dark');
                                                                }
                                                            }}
                                                            color='primary'
                                                        >
                                                            {logo ? <IoMoon /> : <IoSunny />}
                                                        </IconButton>
                                                    </Fragment>
                                                ),
                                                sidebarFooter: ({ mini }) => (
                                                    <Fragment>
                                                        <Divider />
                                                        <Typography
                                                            variant='caption'
                                                            sx={{
                                                                m: 1,
                                                                textAlign: 'center',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {mini
                                                                ? '© 2025'
                                                                : `© 2025 Desenvolvido por Linkme Tur.`}
                                                        </Typography>
                                                    </Fragment>
                                                ),
                                            }}
                                        >
                                            {children}
                                        </DashboardLayout>
                                    </SuspenseFallback>
                                </NextAppProvider>
                            </ThemeProvider>
                        ) : (
                            <ThemeProvider theme={themelight}>
                                <CssBaseline />
                                <SuspenseFallback>{children}</SuspenseFallback>
                            </ThemeProvider>
                        )}
                    </AppRouterCacheProvider>
                </PersistGate>
            </Provider>
        </ThemeModeContext.Provider>
    );
}
