'use client';
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

import { Dispatch, SetStateAction } from 'react';
import {
    FaMagnifyingGlass,
    FaXmark,
    //    FaList,
    // FaMapLocationDot
} from 'react-icons/fa6';
type Filter = {
    nome_servico: string;
    categoria: string;
    localizacao: string;
    min_valor: number;
    max_valor: number;
    min_rating: number;
    orderBy: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
};
export default function SearchService({
    filter,
    onSet,
    onPress,
}: {
    filter: Filter;
    onSet: Dispatch<SetStateAction<Filter>>;
    onPress: () => void;
}) {
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
                        <Select
                            label='Tipo de Serviço'
                            value={filter.categoria || ''}
                            onChange={(e) => onSet({ ...filter, categoria: e.target.value })}
                        >
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
                        value={filter.localizacao || ''}
                        onChange={(e) => onSet({ ...filter, localizacao: e.target.value })}
                    />

                    {/* Faixa de Preço */}
                    <FormControl fullWidth>
                        <InputLabel id='fp'>Faixa de Preço</InputLabel>
                        <Select
                            labelId='fp'
                            label='Faixa de Preço'
                            value={
                                [filter.min_valor, filter.max_valor].join('-') === '0-0'
                                    ? ''
                                    : [filter.min_valor, filter.max_valor].join('-')
                            }
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    onSet({
                                        ...filter,
                                        min_valor: 0,
                                        max_valor: 0,
                                    });
                                } else {
                                    const [min, max] = e.target.value.split('-');
                                    onSet({
                                        ...filter,
                                        min_valor: Number(min),
                                        max_valor: Number(max),
                                    });
                                }
                            }}
                        >
                            <MenuItem value=''>Qualquer preço</MenuItem>
                            <MenuItem value='0-1000'>Até R$ 1.000</MenuItem>
                            <MenuItem value='1000-3000'>R$ 1.000 - R$ 3.000</MenuItem>
                            <MenuItem value='3000-5000'>R$ 3.000 - R$ 5.000</MenuItem>
                            <MenuItem value='5000-0'>Acima de R$ 5.000</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Avaliação Mínima */}
                    <FormControl fullWidth>
                        <InputLabel>Avaliação Mínima</InputLabel>
                        <Select
                            label='Avaliação Mínima'
                            value={filter.min_rating || ''}
                            onChange={(e) =>
                                onSet({ ...filter, min_rating: Number(e.target.value) })
                            }
                        >
                            <MenuItem value=''>Qualquer avaliação</MenuItem>
                            <MenuItem value='5'>5 estrelas</MenuItem>
                            <MenuItem value='4'>4+ estrelas</MenuItem>
                            <MenuItem value='3'>3+ estrelas</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box display='flex' alignItems='center' mt={3} gap={2}>
                    <Button
                        variant='contained'
                        color='success'
                        startIcon={<FaMagnifyingGlass />}
                        onClick={onPress}
                    >
                        Buscar
                    </Button>

                    <Button
                        variant='outlined'
                        color='error'
                        startIcon={<FaXmark />}
                        onClick={() =>
                            onSet({
                                nome_servico: '',
                                categoria: '',
                                localizacao: '',
                                min_rating: 0,
                                min_valor: 0,
                                max_valor: 0,
                                orderBy: 'relevance',
                            })
                        }
                    >
                        Limpar Filtros
                    </Button>

                    {/* <Box ml='auto' display='flex' gap={2}>
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
                    </Box> */}
                </Box>
            </Paper>
        </Box>
    );
}
