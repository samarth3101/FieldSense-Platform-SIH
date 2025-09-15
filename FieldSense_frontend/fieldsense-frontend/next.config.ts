const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")], 
    additionalData: `
      @import "src/styles/variables.scss";
      @import "src/styles/mixins.scss";
    `,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
