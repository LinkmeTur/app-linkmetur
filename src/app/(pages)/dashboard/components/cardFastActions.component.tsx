'use client';
import { useThemeMode } from '@/app/themes/themeMode.context';
import { Card } from '@mui/material';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

interface TCarFastAction {
    goPath: string;
    icon: JSX.Element;
    iconColor: string;
    title: string;
    subTitle: string;
}

function CarFastAction({ goPath, icon, iconColor, title, subTitle }: TCarFastAction) {
    const router = useRouter();
    const theme = useThemeMode();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            setIsDark(true);
            return;
        }
        setIsDark(false);
    }, [theme]);

    return (
        <Card
            id='action-new-service'
            className=' rounded-lg  p-4 '
            onClick={() => {
                router.push(goPath);
            }}
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: isDark ? '#282828ff' : '#f3f3f3ff',
                },
            }}
        >
            <div className='flex items-center space-x-3'>
                <div
                    className={`h-10 w-10 rounded-full bg-${iconColor}-100 flex items-center justify-center text-${iconColor}-500`}
                >
                    {icon}
                </div>
                <div>
                    <p className='font-medium'>{title}</p>
                    <p className='text-xs text-gray-500'>{subTitle}</p>
                </div>
            </div>
        </Card>
    );
}

export default CarFastAction;
