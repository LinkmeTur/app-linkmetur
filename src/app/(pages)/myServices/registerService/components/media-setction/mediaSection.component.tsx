/* eslint-disable @next/next/no-img-element */
'use client';
import { Delete, PhotoCamera } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { setRegisterService } from '@/app/store/reducers/jobs/jobs.slice';
import { sendFileS3, deleteFile } from '@/app/api/awsS3';

const MediaSection: FC = () => {
    const dispatch = useAppDispatch();
    const { registerService } = useAppSelector((state) => state.jobs);
    const [images, setImages] = useState<{ photo_URL: string; photo_alt: string }[]>(
        registerService?.photos || [],
    );

    const [videoURL, setVideoURL] = useState<string>();

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (images.length > 5) return;

        const files = event.target.files;
        if (!files) return;

        const newPhoto = await sendFileS3('job_images', files[0]);
        if (newPhoto) {
            setImages((prevImages) => [
                ...prevImages,
                { photo_URL: newPhoto.file_URL, photo_alt: newPhoto.file_alt },
            ]);
            if (registerService?.photos) {
                dispatch(
                    setRegisterService({
                        photos: [
                            ...registerService.photos,
                            {
                                photo_URL: newPhoto.file_URL,
                                photo_alt: newPhoto.file_alt,
                            },
                        ],
                    }),
                );
            } else {
                dispatch(
                    setRegisterService({
                        photos: [
                            {
                                photo_URL: newPhoto.file_URL,
                                photo_alt: newPhoto.file_alt,
                            },
                        ],
                    }),
                );
            }
        }
    };

    const removeImage = async (index: number) => {
        const newPhoto = images[index];
        await deleteFile('job_images', newPhoto.photo_URL);
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        dispatch(
            setRegisterService({
                photos: images.filter((_, i) => i !== index) || [],
            }),
        );
    };

    useEffect(() => {
        if (registerService) {
            setImages(registerService.photos || []);
            setVideoURL(registerService.video_url || '');
        }
    }, []);

    useEffect(() => {
        if (registerService?.photos && registerService?.video_url) {
            setImages(registerService.photos);
            setVideoURL(registerService.video_url);
            return;
        }
        if (registerService?.photos) {
            setImages(registerService.photos);
            return;
        }

        if (registerService?.video_url) {
            setVideoURL(registerService.video_url);
            return;
        }
        setVideoURL('');
        setImages([]);
    }, [registerService]);

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Fotos e Mídias
            </Typography>

            <Typography variant='subtitle1'>Fotos do Serviço *</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Adicione até 5 fotos que demonstrem seu serviço. A primeira foto será a principal.
            </Typography>

            <input
                type='file'
                accept='image/*'
                multiple
                value={''}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id='upload-photo'
            />
            <label htmlFor='upload-photo'>
                {images.length < 5 && (
                    <Button
                        variant='outlined'
                        component='span'
                        startIcon={<PhotoCamera />}
                        disabled={images.length >= 5}
                    >
                        Adicionar Fotos
                    </Button>
                )}
            </label>

            <Grid container spacing={1} sx={{ mt: 2 }}>
                {images.map((image, index) => (
                    <Grid size={2.4} key={index}>
                        <Card sx={{ position: 'relative', width: 180 }}>
                            <CardMedia sx={{ height: 120 }}>
                                <img
                                    src={image.photo_URL || undefined}
                                    alt={image.photo_alt || 'Imagem' + index}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </CardMedia>
                            <IconButton
                                onClick={() => removeImage(index)}
                                sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant='subtitle1' sx={{ mt: 4 }}>
                Vídeo Demonstrativo (Opcional)
            </Typography>
            <TextField
                fullWidth
                variant='outlined'
                placeholder='URL do vídeo (YouTube, Vimeo)'
                sx={{ mt: 2 }}
                value={videoURL || ''}
                onChange={(e) => setVideoURL(e.target.value)}
                onBlur={() => dispatch(setRegisterService({ video_url: videoURL }))}
            />
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Adicione um link para um vídeo que demonstre seu serviço ou apresente seu portfólio.
            </Typography>
        </Box>
    );
};

export default MediaSection;
