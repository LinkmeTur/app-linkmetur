import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Rating,
    Typography,
} from '@mui/material';
import {
    FaRegStar,
    //  FaHeart,
    FaRegHeart,
} from 'react-icons/fa';
import Image from 'next/image';

export default function CardService() {
    return (
        <Card className='rounded-lg flex flex-col md:flex-row'>
            <CardMedia className='md:w-1/3 h-48 md:h-auto bg-gray-200 relative'>
                <Image
                    src=''
                    alt='Marketing digital para empresas de turismo'
                    width={300}
                    height={300}
                />
                <Box className='absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium p-1 rounded flex '>
                    <FaRegStar className='mr-1' /> <Typography className=' text-xs'>4.9</Typography>
                </Box>
            </CardMedia>
            <Box className='md:w-2/3 flex flex-col'>
                <CardContent>
                    <div className='flex items-center space-x-2 mb-2'>
                        <Chip label='Marketing' size='small' color='success' />
                        <Chip label='Marketing Digital' size='small' />
                    </div>
                    <Typography className='font-medium  mb-1'>
                        Estratégia Completa de Marketing Digital
                    </Typography>
                    <Typography className='text-sm opacity-70'>
                        Desenvolvemos estratégias completas de marketing digital para empresas de
                        turismo, incluindo gestão de redes sociais, SEO, campanhas de anúncios e
                        análise de resultados.
                    </Typography>
                </CardContent>
                <CardActions className='mt-auto flex items-center justify-between'>
                    <div>
                        <p className='font-semibold text-gray-900'>
                            R$ 2.500,00
                            <span className='text-sm font-normal text-gray-500'>/mês</span>
                        </p>
                        <div className='flex items-center mt-1'>
                            <div className='flex text-amber-400 text-xs'>
                                <Rating
                                    name='simple-controlled'
                                    value={2}
                                    // onChange={(event, newValue) => {
                                    //   setValue(newValue);
                                    // }}
                                    size='small'
                                />
                            </div>
                            <span className='text-xs text-gray-500 ml-1'>(42 avaliações)</span>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <IconButton className='text-gray-400 hover:text-red-500'>
                            <FaRegHeart className='fa-regular fa-heart text-lg'></FaRegHeart>
                        </IconButton>
                        <Button
                            variant='contained'
                            color='success'
                            className='font-medium py-2 px-4 rounded-md'
                        >
                            Ver detalhes
                        </Button>
                    </div>
                </CardActions>
            </Box>
        </Card>
    );
}
