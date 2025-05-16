'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
            router.push('/signin'); // Redireciona após a animação
        }, 3000); // Duração da animação

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className='flex items-center justify-center h-screen bg-blue-600 text-white text-4xl font-bold'
        >
            {showAnimation && 'LinkMe Tur - App'}
        </motion.div>
    );
}
