/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = (phase, { defaultConfig }) => {
    if ('sassOptions' in defaultConfig) {
        defaultConfig['sassOptions'] = {
            includePaths: [path.join(__dirname, 'src/styles')],
            additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss";`,
        };
    }
    return defaultConfig;
};
