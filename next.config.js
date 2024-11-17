/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Add custom config for longer timeouts
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiTimeout: 60000, // 60 seconds
  },
}

export default config
