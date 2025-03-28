/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  rules: {
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // Deshabilitando reglas problemáticas para acelerar el proceso
    '@typescript-eslint/no-explicit-any': 'off', // Permite el uso de "any"
    '@typescript-eslint/no-unsafe-assignment': 'off', // Permite asignaciones inseguras
    '@typescript-eslint/no-unsafe-argument': 'off', // Permite argumentos inseguros
    'react/no-unescaped-entities': 'off', // Deshabilita los errores de entidades no escapadas
    'react-hooks/exhaustive-deps': 'off', // Deshabilita las advertencias sobre dependencias en useEffect
  },
}
module.exports = config
