import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
  },
  eslintConfigPrettier,
];
