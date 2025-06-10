/* eslint-disable @next/next/no-img-element */
'use client';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';

interface CardServiceOrRfpProps {
    imageUrl: string;
    imageAlt: string;
    status: {
        label: string;
        color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
    };
    category: {
        label: string;
        color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
        subCategory: {
            label: string;
            color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
        };
    };

    title: string;
    description: string;
    price: string;
    onClick?: () => void;
}

export default function CardServiceOrRfp({
    imageUrl,
    imageAlt,
    status,
    category,
    title,
    description,
    price,
    onClick,
}: CardServiceOrRfpProps) {
    return (
        <Card id='service-card-1' className='rounded-lg shadow overflow-hidden'>
            <CardMedia className='h-40 bg-gray-200 relative'>
                <img className='w-full h-full object-cover' src={imageUrl} alt={imageAlt} />
                <Chip
                    label={status.label}
                    color={status.color}
                    className='absolute top-2 right-2'
                    size='small'
                />
            </CardMedia>
            <CardContent className='p-4'>
                <Stack direction='row' spacing={2}>
                    <Chip label={category.label} color={category.color} size='small' />
                    <Chip
                        label={category.subCategory.label}
                        color={category.subCategory.color}
                        size='small'
                    />
                </Stack>
                <Typography className='font-medium  mb-1'>{title}</Typography>
                <Typography className='text-sm text-gray-500 mb-2 line-clamp-2'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions className='px-4 border-t border-gray-200'>
                <Stack
                    width={'100%'}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography className='font-semibold text-gray-900'>{price}</Typography>
                    <Button
                        disableRipple
                        className='text-emerald-600 hover:text-emerald-700 text-sm font-medium'
                        onClick={onClick}
                    >
                        Detalhes
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}
