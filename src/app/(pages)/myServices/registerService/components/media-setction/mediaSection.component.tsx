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
import { ChangeEvent, FC, useState } from 'react';

const MediaSection: FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [videoURL, setVideoURL] = useState<string>();

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Fotos e Mídias
            </Typography>

            {/* Upload de imagens */}
            <Typography variant='subtitle1'>Fotos do Serviço *</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Adicione até 5 fotos que demonstrem seu serviço. A primeira foto será a principal.
            </Typography>

            <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id='upload-photo'
            />
            <label htmlFor='upload-photo'>
                <Button variant='outlined' component='span' startIcon={<PhotoCamera />}>
                    Adicionar Fotos
                </Button>
            </label>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {images.map((image, index) => (
                    <Grid size={4} key={index}>
                        <Card sx={{ position: 'relative' }}>
                            <CardMedia
                                component='img'
                                image={image}
                                alt={`Foto ${index + 1}`}
                                sx={{ height: 140 }}
                            />
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

            {/* Campo de URL do Vídeo */}
            <Typography variant='subtitle1' sx={{ mt: 4 }}>
                Vídeo Demonstrativo (Opcional)
            </Typography>
            <TextField
                fullWidth
                variant='outlined'
                placeholder='URL do vídeo (YouTube, Vimeo)'
                sx={{ mt: 2 }}
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
            />
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Adicione um link para um vídeo que demonstre seu serviço ou apresente seu portfólio.
            </Typography>
        </Box>
    );
};

export default MediaSection;
