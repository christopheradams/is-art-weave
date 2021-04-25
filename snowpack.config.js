// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
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
    ["@snowpack/plugin-dotenv"]
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
