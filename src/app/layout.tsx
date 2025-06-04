import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Poppins, Roboto, Lato, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { LinkMeTurAppProvider } from './providers';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const lato = Lato({
    variable: '--font-lato',
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
});

const sourceSansPro = Source_Sans_3({
    variable: '--font-source-sans-3',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'LinkMe Tur-App',
    description:
        'Plataforma Web B2B que conecta empresas do setor de turismo, oferecendo serviços e consultoria especializada.',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'LinkMe Tur-App - Conectando o Turismo',
        description:
            'Soluções B2B para empresas do setor de turismo. Encontre parceiros, serviços e consultoria especializada.',
        url: 'https://app.linkmetur.com.br/',
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
        title: 'LinkMe Tur-App',
        description:
            'Plataforma B2B que conecta empresas do setor de turismo, oferecendo serviços e consultoria especializada.',
        images: ['https://app.linkmetur.com.br/thumbnail.png'],
    },
    alternates: {
        canonical: 'https://app.linkmetur.com.br/',
        languages: {
            'pt-BR': 'https://app.linkmetur.com.br/pt-BR',
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='pt-BR'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${roboto.variable} ${lato.variable} ${sourceSansPro.variable} antialiased`}
            >
                <LinkMeTurAppProvider>{children}</LinkMeTurAppProvider>
            </body>
        </html>
    );
}
