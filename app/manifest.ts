import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'FitPower Academy',
        short_name: 'FitPower',
        description: 'Seu painel fitness e controle de gamificação.',
        start_url: '/',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#00ff9d',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
