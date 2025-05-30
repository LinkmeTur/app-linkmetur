import { Card } from '@mui/material';

export default function CadMetrics() {
    return (
        <Card key='metric-profile-views' className=' rounded-lg shadow p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-gray-500'>Visualizações do Perfil</p>
                    <p className='text-2xl font-bold text-gray-800'>248</p>
                </div>
                <div className='h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500'>
                    <i className='fa-solid fa-eye text-xl'></i>
                </div>
            </div>
            <div className='mt-2 flex items-center text-xs'>
                <span className='text-green-500 font-medium flex items-center'>
                    <i className='fa-solid fa-arrow-up mr-1'></i> 12.5%
                </span>
                <span className='text-gray-500 ml-1'>desde o último mês</span>
            </div>
        </Card>
    );
}
