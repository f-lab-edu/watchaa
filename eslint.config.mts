import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import pluginJs from '@eslint/js';

export default defineConfig([
  // webpack 설정 파일들에 대한 특별한 규칙 (가장 먼저 적용)
  {
    files: ['webpack.*.js'],
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
  },

  // 일반 JavaScript/TypeScript 파일들
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ignores: ['webpack.*.js'], // webpack 설정 파일 제외
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // TypeScript 설정 (webpack 파일 제외)
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    ignores: ['webpack.*.js'],
    ...tseslint.configs.recommended[0],
  },

  // React 설정
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...pluginReact.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  pluginJs.configs.recommended,
]);
