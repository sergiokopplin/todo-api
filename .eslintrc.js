module.exports = {
  extends: ['@kopplin/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@kopplin/prettier-config': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'import/export': 0,
  },
};
