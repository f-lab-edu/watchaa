import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';

import common from './webpack.common.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'development',
  /**
   * source-map 설정
   * dev: eval-cheap-module-source-map - 빠른 빌드 속도, 원본 소스 코드와 매핑 정확도 높음
   */
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 빌드된 파일을 이 경로에서 서빙
    },
    port: 3000, // localhost:3000에서 실행
    open: true, // 서버 실행 시 브라우저 자동 열기
    hot: true, // HMR 사용
    historyApiFallback: true, // SPA 라우팅 지원
    client: {
      overlay: true, // 에러 발생 시 브라우저에 오버레이로 표시
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 개발 환경에서만 React Refresh 플러그인 적용
  ],
});
