module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          components: './components',
          container: './container',
          util: './util',
          services: './services',
          redux: './redux',
        },
      },
    ],
  ],
};
