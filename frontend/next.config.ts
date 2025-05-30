import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com' // Add this line for Auth0/Google user pictures
      // Add any other image domains you might use, e.g., 'cdn.example.com'
    ],
  },
};

export default nextConfig;
