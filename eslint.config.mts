import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['webpack*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: globals.browser,
      // ES2022 주요 기능: Private fields (#field), Static blocks, .at() method, Object.hasOwn()
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+의 새로운 JSX Transform 사용
    },
  },
  /**
   * eslintPluginPrettierRecommended는 eslint-plugin-prettier와 eslint-config-prettier의 권장 설정을 모두 포함
   * 이 설정은 eslint-config-prettier를 자동으로 활성화하므로, eslint-config-prettier를 별도로 import하거나 설정할 필요가 없습니다.
   * eslint-config-prettier: ESLint의 포매팅 관련 규칙을 비활성화하여 Prettier와 충돌하지 않도록 합니다.
   * eslint-plugin-prettier: Prettier의 포매팅 규칙을 ESLint의 규칙으로 추가하여 ESLint가 포매팅 오류를 감지하도록 합니다.
   */
  eslintPluginPrettierRecommended,
]);
