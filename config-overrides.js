const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config) {
  config.module.rules.push({
    test: /pdf\.worker\.js$/,
    use: [
      {
        loader: 'worker-loader',
        options: {
          filename: '[name].[contenthash].worker.js',
          publicPath: '/',
        },
      },
    ],
  });

  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "fs": false
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ];

  config.optimization = {
    ...config.optimization,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
          },
        },
      }),
    ],
  };

  return config;
};