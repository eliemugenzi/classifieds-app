module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    curly: [2, 'multi'],
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', {allow: ['warn', 'error']}],
  },
};
