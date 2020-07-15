module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/controllers',
          '@configs': './src/configs',
          '@validators': './src/validators',
          '@routes': './src/routes',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
