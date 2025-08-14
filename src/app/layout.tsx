// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LinkMeTurAppProvider } from './providers';

// Carregando apenas as fontes principais (Geist é padrão do Vercel/Next)
// As demais (Poppins, Roboto etc.) serão usadas pontualmente via CSS classes, se necessário
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap', // Evita FOIT
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
});

// Meta tags corrigidas: URLs sem espaços, estrutura limpa
export const metadata: Metadata = {
    title: {
        default: 'LinkMe Tur-App',
        template: '%s | LinkMe Tur-App',
    },
    description:
        'Plataforma Web B2B que conecta empresas do setor de turismo, oferecendo serviços e consultoria especializada.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-32x32.png',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'LinkMe Tur-App - Conectando o Turismo',
        description:
            'Soluções B2B para empresas do setor de turismo. Encontre parceiros, serviços e consultoria especializada.',
        url: 'https://app.linkmetur.com.br',
        siteName: 'LinkMe Tur-App',
        images: [
            {
                url: 'https://app.linkmetur.com.br/thumbnail.png',
                width: 1200,
                height: 630,
                alt: 'LinkMe Tur-App - Plataforma B2B de Turismo',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinkMe Tur-App - Conectando o Turismo',
        description:
            'Plataforma B2B que conecta empresas do setor de turismo, oferecendo serviços e consultoria especializada.',
        images: ['https://app.linkmetur.com.br/thumbnail.png'],
        site: '@linkmetur',
    },
    alternates: {
        canonical: 'https://app.linkmetur.com.br',
        languages: {
            'pt-BR': 'https://app.linkmetur.com.br/pt-BR',
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='pt-BR' dir='ltr' suppressHydrationWarning>
            <body
                className={`

          ${geistSans.variable} 
          ${geistMono.variable}

          font-sans
          antialiased
          
          text-gray-900
          

        `}
            >
                {/* Provider do Toolpad + Auth, Theme, Router, Socket.IO, etc */}
                <LinkMeTurAppProvider>{children}</LinkMeTurAppProvider>
            </body>
        </html>
    );
}
