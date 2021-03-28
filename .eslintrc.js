module.exports = {
  extends: ['@kopplin/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'import/export': 0,
  },
};
