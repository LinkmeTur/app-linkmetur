'use client';
import {
    Paper,
    Typography,
    Box,
    TextField,
    MenuItem,
    Grid,
    Divider,
    Card,
    CardMedia,
    IconButton,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { PhotoCamera, Delete, Info } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { ChangeEvent, FC, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const categories = {
    marketing: [
        'Marketing Digital',
        'Gestão de Redes Sociais',
        'SEO',
        'Conteúdo',
        'Branding',
        'Fotografia',
        'Design Gráfico',
        'Email Marketing',
    ],
    tecnologia: [
        'Desenvolvimento Web',
        'Aplicativos Móveis',
        'Sistemas de Reserva',
        'Integração de APIs',
        'Suporte Técnico',
        'Infraestrutura de TI',
        'Cibersegurança',
        'Implementação de WiFi',
    ],
    consultoria: [
        'Estratégia de Negócios',
        'Gestão de Operações',
        'Experiência do Cliente',
        'Análise de Mercado',
        'Plano de Negócios',
        'Gestão de Crise',
    ],
    juridico: [
        'Contratos',
        'Direito do Consumidor',
        'Propriedade Intelectual',
        'Registro de Marca',
        'Compliance',
        'Questões Trabalhistas',
    ],
    contabil: [
        'Contabilidade Geral',
        'Impostos',
        'Folha de Pagamento',
        'Planejamento Fiscal',
        'Auditoria',
        'Gestão Financeira',
    ],
    treinamentos: [
        'Atendimento ao Cliente',
        'Idiomas',
        'Gestão de Equipes',
        'Vendas',
        'Habilidades Técnicas',
        'Liderança',
    ],
    sustentabilidade: [
        'Certificação Ambiental',
        'Gestão de Resíduos',
        'Eficiência Energética',
        'Turismo Sustentável',
        'Economia Circular',
        'Consultoria ESG',
    ],
};

const BasicInfoSection: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Informações Básicas
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                {/* Nome do Serviço */}
                <Grid size={6}>
                    <TextField
                        label='Nome do Serviço'
                        variant='outlined'
                        fullWidth
                        required
                        placeholder='Ex: Consultoria em Marketing Digital'
                    />
                </Grid>

                {/* Faixa de Preço */}
                <Grid container size={6} spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label='Valor Mínimo'
                            type='number'
                            variant='outlined'
                            fullWidth
                            required
                            placeholder='Valor mínimo'
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label='Valor Máximo'
                            type='number'
                            variant='outlined'
                            fullWidth
                            required
                            placeholder='Valor máximo'
                        />
                    </Grid>
                </Grid>

                {/* Categoria */}
                <Grid size={6}>
                    <TextField
                        label='Categoria'
                        select
                        variant='outlined'
                        fullWidth
                        required
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {Object.keys(categories).map((key) => (
                            <MenuItem key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Subcategoria */}
                <Grid size={6}>
                    <TextField
                        label='Subcategoria'
                        select
                        variant='outlined'
                        fullWidth
                        required
                        disabled={!selectedCategory}
                    >
                        {(categories[selectedCategory] || []).map((sub) => (
                            <MenuItem key={sub} value={sub}>
                                {sub}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Descrição */}
                <Grid size={12}>
                    <TextField
                        label='Descrição'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={4}
                        required
                        placeholder='Descreva detalhadamente o serviço que você oferece...'
                    />
                    <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                        Mínimo de 100 caracteres. Descreva o que está incluído, sua experiência e
                        por que as empresas devem escolher seu serviço.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const MediaSection: FC = () => {
    const [images, setImages] = useState<string[]>([]);

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
            />
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Adicione um link para um vídeo que demonstre seu serviço ou apresente seu portfólio.
            </Typography>
        </Box>
    );
};

const certificationsList = [
    { id: 'eco-friendly', label: 'Sustentabilidade / Eco-friendly' },
    { id: 'quality-cert', label: 'Certificação de Qualidade ISO' },
    { id: 'accessibility', label: 'Acessibilidade' },
    { id: 'specialized', label: 'Especialização em Turismo' },
];

const CertificationsSection: FC = () => {
    const [certifications, setCertifications] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string) => {
        setCertifications((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Certificações{' '}
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
                        placeholder='Descreva outras certificações relevantes'
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const shifts = [
    { id: 'morning', label: 'Manhã (08:00 - 12:00)' },
    { id: 'afternoon', label: 'Tarde (13:00 - 17:00)' },
    { id: 'evening', label: 'Noite (18:00 - 22:00)' },
    { id: 'full-day', label: 'Dia inteiro' },
    { id: 'custom', label: 'Horário personalizado' },
];

const ShiftsSection: FC = () => {
    const [selectedShifts, setSelectedShifts] = useState<{ [key: string]: boolean }>({});

    const toggleShiftSelection = (id: string) => {
        setSelectedShifts((prevShifts) => ({
            ...prevShifts,
            [id]: !prevShifts[id],
        }));
    };

    return (
        <Box className='bg-gray-50 p-4 rounded-lg'>
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
                Dias selecionados: {Object.values(selectedShifts).filter((v) => v).length} turnos
            </Typography>
        </Box>
    );
};

export default function RegisterService() {
    return (
        <PageContainer className='w-full px-6'>
            <Paper elevation={2} className=' rounded-lg  p-6 mb-6'>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            borderRadius: '50%',

                            mr: 2,
                        }}
                    >
                        <Info />
                    </Box>
                    <Box>
                        <Typography variant='h6' color='text.primary'>
                            Informações do Serviço
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Preencha os detalhes do serviço que deseja oferecer
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <form id='service-form'>
                    {/* <!-- Basic Information Section --> */}
                    <BasicInfoSection />
                    <Divider />
                    {/* <!-- Photos and Media Section --> */}
                    <MediaSection />
                    <Divider />
                    {/* <!-- Certifications Section --> */}
                    <CertificationsSection />

                    {/* <!-- Availability Section --> */}
                    <Box id='availability-section' className='mb-8'>
                        <Typography className='text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                            Disponibilidade
                        </Typography>

                        <Box className='mb-6'>
                            <Typography className='text-sm text-gray-700 mb-3'>
                                Selecione os dias e turnos em que você está disponível para prestar
                                este serviço:
                            </Typography>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Box className='bg-gray-50 p-2 rounded-lg flex items-center justify-center'>
                                            <DateRangeCalendar calendars={1} />
                                        </Box>
                                    </LocalizationProvider>
                                </div>
                                <div>
                                    <ShiftsSection />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </form>
            </Paper>

            {/* <!-- Preview Section --> */}
            <Paper elevation={2} id='preview-section' className=' rounded-lg  p-6 mb-6'>
                <div className='flex items-center mb-4'>
                    <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3'>
                        <i className='fa-solid fa-eye'></i>
                    </div>
                    <div>
                        <h2 className='text-lg font-medium text-gray-800'>Pré-visualização</h2>
                        <p className='text-sm text-gray-500'>
                            Veja como seu serviço ficará para os clientes
                        </p>
                    </div>
                </div>

                <div className='border border-gray-200 rounded-lg overflow-hidden'>
                    <div className='bg-gray-50 p-4 border-b border-gray-200'>
                        <h3 className='font-medium text-gray-800'>Visualização do Anúncio</h3>
                    </div>

                    <div className='p-6'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='md:col-span-2'>
                                <div className='bg-gray-200 h-52 rounded-lg mb-4 flex items-center justify-center text-gray-400'>
                                    <i className='fa-solid fa-image text-4xl'></i>
                                </div>

                                <div className='flex space-x-2 mb-4'>
                                    <div className='bg-gray-200 h-16 w-16 rounded flex items-center justify-center text-gray-400'>
                                        <i className='fa-solid fa-image'></i>
                                    </div>
                                    <div className='bg-gray-200 h-16 w-16 rounded flex items-center justify-center text-gray-400'>
                                        <i className='fa-solid fa-image'></i>
                                    </div>
                                    <div className='bg-gray-200 h-16 w-16 rounded flex items-center justify-center text-gray-400'>
                                        <i className='fa-solid fa-image'></i>
                                    </div>
                                    <div className='bg-gray-200 h-16 w-16 rounded flex items-center justify-center text-gray-400'>
                                        <i className='fa-solid fa-image'></i>
                                    </div>
                                </div>

                                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                                    Título do Serviço
                                </h2>

                                <div className='flex items-center space-x-2 mb-3'>
                                    <span className='bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded'>
                                        Categoria
                                    </span>
                                    <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                        Subcategoria
                                    </span>
                                </div>

                                <div className='mb-4'>
                                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                                        Descrição
                                    </h3>
                                    <p className='text-sm text-gray-500 mb-2'>
                                        Sua descrição aparecerá aqui. Descreva detalhadamente o
                                        serviço que você oferece...
                                    </p>
                                </div>

                                <div className='mb-4'>
                                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                                        Certificações
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                        <span className='bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center'>
                                            <i className='fa-solid fa-leaf text-xs mr-1'></i>{' '}
                                            Sustentabilidade
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='md:col-span-1'>
                                <div className='bg-gray-50 p-4 rounded-lg'>
                                    <div className='mb-4'>
                                        <h3 className='text-sm font-medium text-gray-700 mb-1'>
                                            Preço
                                        </h3>
                                        <p className='text-xl font-bold text-gray-900'>
                                            R$ 0,00 - R$ 0,00
                                        </p>
                                    </div>

                                    <div className='mb-4'>
                                        <h3 className='text-sm font-medium text-gray-700 mb-1'>
                                            Prestador
                                        </h3>
                                        <div className='flex items-center'>
                                            <img
                                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
                                                alt='Avatar'
                                                className='w-8 h-8 rounded-full mr-2'
                                            />
                                            <div>
                                                <p className='text-sm font-medium text-gray-800'>
                                                    Carlos Oliveira
                                                </p>
                                                <div className='flex text-amber-400 text-xs'>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star-half-stroke'></i>
                                                    <span className='text-gray-500 ml-1'>
                                                        4.8 (42)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-4'>
                                        <h3 className='text-sm font-medium text-gray-700 mb-1'>
                                            Disponibilidade
                                        </h3>
                                        <p className='text-sm text-gray-500'>
                                            Dias e turnos selecionados aparecerão aqui
                                        </p>
                                    </div>

                                    <button
                                        type='button'
                                        disabled
                                        className='w-full bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-md font-medium'
                                    >
                                        Solicitar Proposta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>

            {/* <!-- Form Actions --> */}
            <div id='form-actions' className='flex items-center justify-between'>
                <button
                    type='button'
                    className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium'
                >
                    Salvar como Rascunho
                </button>

                <div className='flex space-x-3'>
                    <button
                        type='button'
                        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium'
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        form='service-form'
                        className='px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium'
                    >
                        Publicar Serviço
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}
