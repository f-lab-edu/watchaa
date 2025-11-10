import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
  // JavaScript 빌드 (ESM + CJS)
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      // 1. peerDependencies 자동 제외
      peerDepsExternal(),

      // 2. esbuild로 TS/TSX -> JS 컴파일
      esbuild({
        target: 'es2020',
        tsconfig: './tsconfig.json',
      }),

      // 3. CSS 처리 및 추출
      postcss({
        extract: 'carousel.css',
        modules: false, // 사용자가 직접 CSS 클래스를 커스텀 가능
        minimize: true,
      }),
    ],
    external: ['react'],
  },
  // 타입 정의 빌드 (.d.ts)
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      dts({
        compilerOptions: {
          types: [], // 자동으로 포함되는 불필요한 타입 정의를 제외
        },
      }),
    ],
    external: [/\.css$/], // CSS 파일 제외
  },
];
