import { Box, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';

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
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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
                        {(categories[selectedCategory] ?? []).map((sub) => (
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

export default BasicInfoSection;
