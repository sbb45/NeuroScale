import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import CookieNotice from '@/components/common/CookieNotice';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    display: 'swap',
    subsets: ['latin', 'cyrillic'],
});

const APP_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://neuroscale-company.ru';
const metadataBase = (() => {
    try {
        return new URL(APP_URL);
    } catch {
        return new URL('https://neuroscale-company.ru');
    }
})();

export const metadata: Metadata = {
    metadataBase,
    title: {
        default: 'NeuroScale',
        template: '%s | NeuroScale',
    },
    description:
        'NeuroScale помогает компаниям внедрять решения на базе искусственного интеллекта: от аудита до запуска и сопровождения проектов.',
    keywords: [
        'NeuroScale',
        'искусственный интеллект',
        'генеративный AI',
        'автоматизация бизнеса',
        'цифровая трансформация',
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: metadataBase,
        siteName: 'NeuroScale',
        title: 'NeuroScale',
        description:
            'AI-решения для роста продаж, маркетинга и клиентского сервиса. Комплексная поддержка от стратегии до внедрения и обучения.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NeuroScale',
        description:
            'AI-решения для роста продаж, маркетинга и клиентского сервиса. Комплексная поддержка от стратегии до внедрения и обучения.',
    },
    robots: {
        index: true,
        follow: true,
    },
    manifest: '/site.webmanifest',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#004FED' }],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={`${montserrat.variable} antialiased`}>
                {children}
                <CookieNotice />
            </body>
        </html>
    );
}
