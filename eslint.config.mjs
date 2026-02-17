import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Общие игноры
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },

  // Базовые правила JS
  js.configs.recommended,

  // Отключаем конфликтующие с Prettier правила форматирования
  eslintConfigPrettier,

  // React / JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Базовые рекомендованные правила React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // Хуки
      ...reactHooks.configs.recommended.rules,

      // Fast refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];

