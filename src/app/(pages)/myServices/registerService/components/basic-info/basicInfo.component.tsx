import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { setRegisterService } from '@/app/store/reducers/jobs/jobs.slice';
import { Box, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const categories: Record<string, string[]> = {
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
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [subcategory, setSubcategory] = useState<string>('');
    const { registerService } = useAppSelector((state) => state.jobs);

    useEffect(() => {
        if (registerService) {
            setName(registerService.nome_servico ?? '');
            setPriceRange([registerService.min_valor ?? 0, registerService.max_valor ?? 0]);
            setDescription(registerService.descricao ?? '');
            setCategory(registerService.categoria ?? '');
            setSubcategory(registerService.sub_categoria ?? '');
        } else {
            setName('');
            setPriceRange([0, 0]);
            setDescription('');
            setCategory('');
            setSubcategory('');
        }
    }, []);

    const handleBasicInfo = () => {
        if (!name || !priceRange || !description || !category || !subcategory) {
            return;
        }

        dispatch(
            setRegisterService({
                nome_servico: name,
                min_valor: priceRange[0],
                max_valor: priceRange[1],
                descricao: description,
                categoria: category,
                sub_categoria: subcategory,
            }),
        );
    };

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                            value={priceRange[0]}
                            onChange={(e) =>
                                setPriceRange([parseInt(e.target.value), priceRange[1]])
                            }
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
                            value={priceRange[1]}
                            onChange={(e) =>
                                setPriceRange([priceRange[0], parseInt(e.target.value)])
                            }
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                        disabled={!category}
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    >
                        {(categories[category] ?? []).map((sub) => (
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleBasicInfo}
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

export default BasicInfoSection;
