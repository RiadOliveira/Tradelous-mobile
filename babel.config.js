module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ['REACT_APP_API_URL'],
        safe: false,
        allowUndefined: false,
      },
    ],
    [
        require.resolve('babel-plugin-module-resolver'),
        {
          cwd: 'babelrc',
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
          alias: {
            '@components': './src/components',
            '@services': './src/services',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@assets': './assets',
            '@routes/*': './src/routes',
          }
        }
      ],
      'jest-hoist'
  ],
};
