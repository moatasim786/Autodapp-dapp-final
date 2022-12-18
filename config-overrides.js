const webpack = require('webpack');
// import webpack from 'webpack';

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    buffer: require.resolve("buffer")
  });
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/node_modules/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
      resolve: {
        alias: {
          process: 'process/browser',
        },
      },
    }),
  ]);
  return config;
};
