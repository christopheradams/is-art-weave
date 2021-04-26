// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const pkg = require('./package.json')

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  env: {
    SNOWPACK_PUBLIC_IS_ART_VERSION: pkg.version
  },
  exclude: [
    '**/contracts/**/*',
    '**/LICENSE',
    '**/package*.json',
    '**/postcss.config.js',
    '**/README.md',
    '**/snowpack.config.js'
  ],
  mount: {
    /* ... */
  },
  plugins: [
    ['@snowpack/plugin-dotenv'],
    ['@snowpack/plugin-postcss'],
    ['@snowpack/plugin-webpack']
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  }
}
