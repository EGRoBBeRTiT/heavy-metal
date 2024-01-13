/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
        additionalData: `@import "@/styles/variables"; @import "@/styles/mixins";`,
    },
};

module.exports = nextConfig;
