import { Box } from '@mui/material';
import FormResetPass from './components/resetPass.components';

export default async function ResetPassword({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: 'grey.100',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FormResetPass slug={slug} />
        </Box>
    );
}
