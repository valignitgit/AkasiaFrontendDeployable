module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.module\.css$/i,
        use: [
          // inject CSS into the DOM
          'style-loader',
          // interprets `@import` and `url()` like `import/require()` and resolves them
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // inject CSS into the DOM
          'style-loader',
          // interprets `@import` and `url()` like `import/require()` and resolves them
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          // compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
