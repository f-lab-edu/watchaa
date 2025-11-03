module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 폴리필 처리 방식 설정
        // "entry": 진입점에서 import한 폴리필을 브라우저 지원에 따라 필요한 것만 포함
        // "usage": 실제 사용한 기능만 자동으로 폴리필 추가 (더 효율적이지만 설정 복잡)
        // false: 폴리필 자동 처리 안함
        useBuiltIns: 'entry',

        // core-js 버전 명시 (JavaScript 표준 라이브러리 폴리필)
        // 3: 최신 core-js v3 사용 (ES6+ 기능들의 폴리필 제공)
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-react-compiler'],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
};
