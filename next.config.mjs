
const nextConfig = {
  // Enable standalone output for optimized Docker builds
  // This creates a minimal bundle with only necessary dependencies
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5005",
        pathname: "/**",
      }
    ],
  },
  experimental:{
    serverActions:{
      bodySizeLimit:"5mb",
    },
  }
};

export default nextConfig;