import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        lang: 'en-US',
        short_name: 'Best Rock Albums',
        name: "The Best Rock 'n' Roll Albums",
        description:
            "An application for viewing list of my favorite Rock 'n' Roll albums of all time",
        prefer_related_applications: false,
        icons: [
            {
                src: '/logo/logo-57.png',
                type: 'image/png',
                sizes: '57x57',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-72.png',
                type: 'image/png',
                sizes: '72x72',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-96.png',
                type: 'image/png',
                sizes: '96x96',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-144.png',
                type: 'image/png',
                sizes: '14x144',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-180.png',
                type: 'image/png',
                sizes: '180x180',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-192.png',
                type: 'image/png',
                sizes: '192x192',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-256.png',
                type: 'image/png',
                sizes: '256x256',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-384.png',
                type: 'image/png',
                sizes: '384x384',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-512.png',
                type: 'image/png',
                sizes: '512x512',
                purpose: 'maskable',
            },
            {
                src: '/logo/logo-1024.png',
                type: 'image/png',
                sizes: '1024x1024',
                purpose: 'maskable',
            },
        ],
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        theme_color: '#000000',
        shortcuts: [],
        screenshots: [
            {
                src: '/screenshots/screenshot-narrow.png',
                type: 'image/jpeg',
                sizes: '1170x2532',
                // form_factor: 'narrow',
            },
            {
                src: '/screenshots/screenshot-wide.png',
                type: 'image/png',
                sizes: '2880x1620',
                // form_factor: 'wide',
            },
        ],
        display_override: ['window-controls-overlay'],
    };
}
