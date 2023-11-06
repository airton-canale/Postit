/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    // }
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '**',
          },
        ],
      },
    }

module.exports = nextConfig
