/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const skipValidation = !!process.env.SKIP_ENV_VALIDATION
!skipValidation && (await import('./src/env.js'))

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Advertencia: Esto permitirá que tu build se complete incluso con errores de ESLint
    ignoreDuringBuilds: true,
  },
}

export default config
