/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // ATENÇÃO: Isso permite o build em produção mesmo com erros de TypeScript.
        ignoreBuildErrors: true,
    },
    eslint: {
        // ATENÇÃO: Isso permite o build em produção mesmo com erros no ESLint.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
