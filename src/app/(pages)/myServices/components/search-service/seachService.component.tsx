import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { FaMagnifyingGlass, FaXmark, FaList, FaMapLocationDot } from 'react-icons/fa6';

export default function SearchService() {
    return (
        <Box id='search-filters' mb={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant='h6' fontWeight='bold' color='textPrimary' mb={3}>
                    Filtros de Busca
                </Typography>

                <Box
                    display='grid'
                    gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    gap={3}
                >
                    {/* Tipo de Serviço */}
                    <FormControl fullWidth>
                        <InputLabel>Tipo de Serviço</InputLabel>
                        <Select defaultValue=''>
                            <MenuItem value=''>Todos os serviços</MenuItem>
                            <MenuItem value='marketing'>Marketing</MenuItem>
                            <MenuItem value='tecnologia'>Tecnologia</MenuItem>
                            <MenuItem value='consultoria'>Consultoria</MenuItem>
                            <MenuItem value='juridico'>Jurídico</MenuItem>
                            <MenuItem value='contabil'>Contábil</MenuItem>
                            <MenuItem value='treinamentos'>Treinamentos</MenuItem>
                            <MenuItem value='sustentabilidade'>Sustentabilidade</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Localização */}
                    <TextField
                        fullWidth
                        label='Localização'
                        placeholder='Digite uma cidade ou estado'
                    />

                    {/* Faixa de Preço */}
                    <FormControl fullWidth>
                        <InputLabel>Faixa de Preço</InputLabel>
                        <Select defaultValue=''>
                            <MenuItem value=''>Qualquer preço</MenuItem>
                            <MenuItem value='0-1000'>Até R$ 1.000</MenuItem>
                            <MenuItem value='1000-3000'>R$ 1.000 - R$ 3.000</MenuItem>
                            <MenuItem value='3000-5000'>R$ 3.000 - R$ 5.000</MenuItem>
                            <MenuItem value='5000+'>Acima de R$ 5.000</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Avaliação Mínima */}
                    <FormControl fullWidth>
                        <InputLabel>Avaliação Mínima</InputLabel>
                        <Select defaultValue=''>
                            <MenuItem value=''>Qualquer avaliação</MenuItem>
                            <MenuItem value='5'>5 estrelas</MenuItem>
                            <MenuItem value='4'>4+ estrelas</MenuItem>
                            <MenuItem value='3'>3+ estrelas</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box display='flex' alignItems='center' mt={3} gap={2}>
                    <Button variant='contained' color='success' startIcon={<FaMagnifyingGlass />}>
                        Buscar
                    </Button>

                    <Button variant='outlined' color='error' startIcon={<FaXmark />}>
                        Limpar Filtros
                    </Button>

                    <Box ml='auto' display='flex' gap={2}>
                        <Button variant='outlined' color='success' startIcon={<FaList />}>
                            Lista
                        </Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            startIcon={<FaMapLocationDot />}
                        >
                            Mapa
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
