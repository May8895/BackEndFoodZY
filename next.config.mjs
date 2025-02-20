// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     eslint: {
//       ignoreDuringBuilds: true, // Disable ESLint errors stopping the build
//     },
//   };
  
//   export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disable ESLint errors stopping the build
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.vercel-storage.com",
        },
        {
          protocol: "https",
          hostname: "back-end-food-zy.vercel.app",
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
      ],
    },
  }
  
  export default nextConfig
  
  
  