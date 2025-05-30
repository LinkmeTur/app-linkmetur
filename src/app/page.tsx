'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Home() {
    const router = useRouter();
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
            router.push('/signin'); // Redireciona após a animação
        }, 3200); // Duração da animação

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4 }}
                className='flex items-center justify-center h-screen'
            >
                {showAnimation && <DotLottieReact src='LinkMe Tur.lottie' autoplay speed={0.5} />}
            </motion.div>
        </AnimatePresence>
    );
}
