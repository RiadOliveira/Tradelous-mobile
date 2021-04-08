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
  ],
};
