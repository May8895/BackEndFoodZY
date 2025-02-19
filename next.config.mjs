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
      domains: ["localhost", "https://back-end-food-zy.vercel.app/", "public.blob.vercel-storage.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  }
  
  export default nextConfig
  
  
  