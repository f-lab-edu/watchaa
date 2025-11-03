# @watchaa/typescript-config

Shared TypeScript configuration for Watchaa monorepo projects.

## 사용 방법

### 1. 패키지 설치

프로젝트의 `package.json`에 다음을 추가:

```json
{
  "devDependencies": {
    "@watchaa/typescript-config": "workspace:*",
    "typescript": "^5.9.2"
  }
}
```

### 2. TypeScript 설정 파일 생성

프로젝트 루트에 `tsconfig.json` 파일 생성:

```json
{
  "extends": "@watchaa/typescript-config",
  "compilerOptions": {
    // 프로젝트별 추가 설정
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "..."],
  "exclude": ["node_modules"]
}
```

## 커스터마이징

개별 프로젝트에서 설정 오버라이드 가능:

```json
{
  "extends": "@watchaa/typescript-config",
  "compilerOptions": {
    "target": "es5",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
