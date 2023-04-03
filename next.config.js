/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.REACT_SUPABASE_URL,
    SUPABASE_ANON_PKEY: process.env.REACT_SUPABASE_ANON_KEY,
  }
}

module.exports = nextConfig
