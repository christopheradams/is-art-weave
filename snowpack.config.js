// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  env: {
    IS_ART_CONTRACT_ID: 'PiM6NAml7owLgLkGafrfT662rkBh0n_PD7ltEEpI3aw'
  },
  exclude: [
    '**/contracts/**/*',
    '**/LICENSE',
    '**/package*.json',
    '**/README.md',
    '**/snowpack.config.js'
  ],
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
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
