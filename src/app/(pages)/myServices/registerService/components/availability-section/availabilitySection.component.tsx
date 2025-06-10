/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';

import { setRegisterService } from '@/app/store/reducers/jobs/jobs.slice';

const shifts = [
    { id: 'morning', label: 'Manhã (08:00 - 12:00)' },
    { id: 'afternoon', label: 'Tarde (13:00 - 17:00)' },
    { id: 'evening', label: 'Noite (18:00 - 22:00)' },
    { id: 'full-day', label: 'Dia inteiro' },
    { id: 'custom', label: 'Horário personalizado' },
];

export default function AvailabilitySection() {
    const dispatch = useAppDispatch();
    const { registerService } = useAppSelector((state) => state.jobs);

    const [selectedShifts, setSelectedShifts] = useState<{ [key: string]: boolean }>({});

    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    useEffect(() => {
        if (!registerService?.disponibilidade) {
            setSelectedDates([]);
            setSelectedShifts({});
            return;
        }
        const array = JSON.parse(registerService?.disponibilidade);
        if (array.dates) {
            setSelectedDates(array.dates);
        }
        if (array.shifts) {
            setSelectedShifts(array.shifts);
        }
    }, []);

    const handleDateClick = (newDate: any) => {
        const formattedDate = newDate.format('YYYY-MM-DD');

        // Se já estiver selecionada, remove. Se não, adiciona ao estado
        setSelectedDates((prevDates) =>
            prevDates.includes(formattedDate)
                ? prevDates.filter((date) => date !== formattedDate)
                : [...prevDates, formattedDate],
        );
    };

    const toggleShiftSelection = (id: string) => {
        setSelectedShifts((prevShifts) => ({
            ...prevShifts,
            [id]: !prevShifts[id],
        }));
    };

    useEffect(() => {
        dispatch(setRegisterService({ disponibilidade: '' }));
        const shifts = selectedShifts;
        dispatch(
            setRegisterService({
                disponibilidade: JSON.stringify({
                    dates: selectedDates,
                    shifts,
                }),
            }),
        );
    }, [selectedDates, selectedShifts]);

    return (
        <Box id='availability-section' className='mb-8'>
            <Typography className='text-md font-medium  mb-4 pb-2 border-b border-gray-200'>
                Disponibilidade
            </Typography>

            <Box className='mb-6'>
                <Typography className='text-sm  mb-3'>
                    Selecione os dias e turnos em que você está disponível para prestar este
                    serviço:
                </Typography>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box className=' p-2 rounded-lg flex flex-col items-center justify-center'>
                            <DateCalendar
                                value={null}
                                onChange={handleDateClick}
                                shouldDisableDate={(day) =>
                                    selectedDates.includes(day.format('YYYY-MM-DD'))
                                }
                                sx={{
                                    '& .Mui-disabled': {
                                        backgroundColor: '#1976D2',
                                        color: '#FFF',
                                        borderRadius: '50%',
                                    },
                                }}

                                // Para evitar que apenas uma data fique marcada
                            />
                            <Stack direction={'row'}>
                                <Button onClick={() => setSelectedDates([])}>Limpar</Button>
                                <Button
                                    onClick={() =>
                                        setSelectedDates(
                                            selectedDates.filter(
                                                (d) =>
                                                    d !== selectedDates[selectedDates.length - 1],
                                            ),
                                        )
                                    }
                                >
                                    Defazer
                                </Button>
                            </Stack>
                        </Box>
                    </LocalizationProvider>

                    <Box className=' p-4 rounded-lg'>
                        <Typography variant='h6' gutterBottom>
                            Turnos Disponíveis
                        </Typography>

                        <Grid container spacing={1.8}>
                            {shifts.map((shift) => (
                                <Grid size={12} key={shift.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedShifts[shift.id] || false}
                                                onChange={() => toggleShiftSelection(shift.id)}
                                                color='primary'
                                            />
                                        }
                                        label={shift.label}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant='body2' color='success.main' sx={{ mt: 2 }}>
                            Dias selecionados:{' '}
                            {Object.values(selectedShifts).filter((v) => v).length} turnos
                        </Typography>
                    </Box>
                </div>
            </Box>
        </Box>
    );
}
