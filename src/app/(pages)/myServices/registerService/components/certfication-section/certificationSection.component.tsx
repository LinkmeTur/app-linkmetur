'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { setRegisterService } from '@/app/store/reducers/jobs/jobs.slice';
import { Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const certificationsListDefault = [
    { id: '025c027f-3308-46d9-822d-2c1f39a76fd3', label: 'Sustentabilidade / Eco-friendly' },
    { id: '45e670e0-1cb0-4c89-a754-3acd453c3de1', label: 'Certificação de Qualidade ISO' },
    { id: 'e9597701-30c5-462b-b017-3b8e803e05c4', label: 'Acessibilidade' },
    { id: 'fbcec21c-7b97-472e-a2d5-344bffc65159', label: 'Especialização em Turismo' },
];
const CertificationsSection: FC = () => {
    const dispatch = useAppDispatch();
    const { registerService } = useAppSelector((state) => state.jobs);
    const [certificationsList, setCertificationsList] =
        useState<{ id: string; label: string }[]>(certificationsListDefault);
    const [certifications, setCertifications] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string) => {
        setCertifications((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    useEffect(() => {
        if (!registerService?.certificacoes) {
            setCertificationsList(certificationsListDefault);
            setCertifications({});
            return;
        }
        if (registerService.certificacoes) {
            const parsedCertifications = JSON.parse(registerService.certificacoes);
            if (!parsedCertifications) {
                return;
            }
            const listnew = parsedCertifications.filter((cert: { id: string; label: string }) => {
                return !certificationsListDefault.some((defaultCert) => defaultCert.id === cert.id);
            });
            setCertificationsList((prev) => [...prev, ...listnew]);
            const newCertifications = parsedCertifications.reduce(
                (acc: { [x: string]: boolean }, curr: { id: string | number }) => {
                    acc[curr.id] = true;
                    return acc;
                },
                {},
            );
            setCertifications(newCertifications);
        }
    }, []);

    useEffect(() => {
        const selectedCertifications = certificationsList.filter((cert) => certifications[cert.id]);
        dispatch(setRegisterService({ certificacoes: JSON.stringify(selectedCertifications) }));
    }, [certifications]);

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Certificações
                <Typography variant='caption' color='text.secondary'>
                    (Opcional)
                </Typography>
            </Typography>

            <Grid container spacing={1}>
                {certificationsList.map((cert) => (
                    <Grid size={12} key={cert.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={certifications[cert.id] || false}
                                    onChange={() => handleCheckboxChange(cert.id)}
                                    color='primary'
                                />
                            }
                            label={cert.label}
                        />
                    </Grid>
                ))}

                {/* Campo para outras certificações */}
                <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Outras Certificações'
                        placeholder='Descreva outras certificações relevantes separadas por " ; "'
                        onBlur={(e) => {
                            const newCertifications = e.target.value
                                .split(';')
                                .filter((cert) => {
                                    const existingCert = certificationsList.find(
                                        (c) => c.label === cert,
                                    );
                                    if (!existingCert || cert !== '') {
                                        return cert;
                                    }
                                })
                                .map((cert) => ({ id: v4(), label: cert }));

                            setCertificationsList((prev) => [...prev, ...newCertifications]);
                            newCertifications.forEach((cert) => {
                                handleCheckboxChange(cert.id);
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CertificationsSection;
