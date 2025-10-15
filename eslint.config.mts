import pluginJs from '@eslint/js';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginN from 'eslint-plugin-n';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  ...pluginTanstackQuery.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts,jsx,tsx,mjs}'],
    ignores: ['node_modules', 'dist'],
    plugins: {
      n: pluginN,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'n/prefer-node-protocol': 'error', // 모든 파일에서 node: 접두사 강제
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    plugins: {
      ...pluginReact.configs.flat.recommended.plugins,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+의 새로운 JSX Transform 사용
      'no-duplicate-imports': 'error', // 중복 import 방지
      'react-hooks/rules-of-hooks': 'error', // Hooks의 규칙을 확인
      'react-hooks/exhaustive-deps': 'warn', // 의존성 배열을 확인
      'react/self-closing-comp': 'error', // 빈 컴포넌트를 self-closing 형태로 강제
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // 불필요한 중괄호 제거
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
