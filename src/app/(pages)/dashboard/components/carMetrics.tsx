'use client';
import { Card } from '@mui/material';
import { JSX } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function CadMetrics({
    title,
    count,
    percent,
    icon,
    iconBg,
}: {
    title: string;
    count: string;
    percent: string;
    icon: JSX.Element;
    iconBg: string;
}) {
    return (
        <Card key='metric-profile-views' className=' rounded-lg  p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium'>{title}</p>
                    <p className='text-2xl font-bold text-gray-800'>{count}</p>
                </div>
                <div
                    className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center text-${iconBg.split('-')[1]}-500 text-xl`}
                >
                    {icon}
                </div>
            </div>
            <div className='mt-2 flex items-center text-xs'>
                {!isNaN(Number(percent)) ? (
                    <>
                        <span className='text-green-500 font-medium flex items-center'>
                            <FaArrowUp /> {percent}%
                        </span>
                        <span className='text-gray-500 ml-1'>desde o último mês</span>
                    </>
                ) : (
                    <span className='text-gray-500 ml-1'>{percent}</span>
                )}
            </div>
        </Card>
    );
}
