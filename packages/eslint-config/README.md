# @watchaa/eslint-config

Shared ESLint configuration for Watchaa monorepo projects.

## 사용 방법

### 1. 패키지 설치

프로젝트의 `package.json`에 다음을 추가:

```json
{
  "devDependencies": {
    "@watchaa/eslint-config": "workspace:*"
  }
}
```

### 2. ESLint 설정 파일 생성

프로젝트 루트에 `eslint.config.mjs` 파일 생성:

```js
import baseConfig from '@watchaa/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig,
  // 프로젝트별 추가 설정
]);
```

### 3. TanStack Query 사용하는 프로젝트

TanStack Query를 사용하는 프로젝트는 별도로 플러그인 추가:

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

```js
import baseConfig from '@watchaa/eslint-config';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...pluginTanstackQuery.configs['flat/recommended'],
  ...baseConfig,
]);
```

## 포함된 규칙

- **@eslint/js**: JavaScript 권장 규칙
- **typescript-eslint**: TypeScript 권장 규칙
- **eslint-plugin-react**: React 규칙 (JSX Transform 지원)
- **eslint-plugin-react-hooks**: Hooks 규칙
- **eslint-plugin-n**: Node.js 규칙 (node: protocol 강제)
- **eslint-plugin-prettier**: Prettier 통합

## 커스터마이징

개별 프로젝트에서 규칙 오버라이드 가능:

```js
export default defineConfig([
  ...baseConfig,
  {
    rules: {
      'react/prop-types': 'off', // PropTypes 규칙 비활성화
    },
  },
]);
```
