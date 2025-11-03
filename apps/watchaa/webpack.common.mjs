import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 모든 리소스를 절대 경로로 참조
    clean: true, // 기존 빌드 파일 제거
  },
  plugins: [
    // HTML 파일을 템플릿으로 등록해두면, 웹팩이 알아서 필요한 JavaScript와 CSS 파일을 자동으로 삽입
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 파일 경로
      filename: 'index.html', // 생성될 HTML 파일 이름
      inject: 'body', // 스크립트를 body 태그 끝에 삽입
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`, // 환경별 .env 파일 경로
      systemvars: true, // GitHub Secrets 같은 시스템 환경 변수도 함께 로드
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts와 .tsx 파일을 대상으로
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward', // 상위 디렉토리에서 babel.config.js 찾아 사용
            },
          },
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../packages'),
          path.resolve(__dirname, 'node_modules/@tanstack/react-query'),
          path.resolve(__dirname, 'node_modules/@tanstack/query-core'),
        ],
      },
      /**
       * 정적 리소스 (이미지, 폰트 등) 처리
       * asset/resource: 이미지를 독립적인 파일로 생성하여 파일 경로를 제공. 대형 이미지에 적합.
       * asset/inline: 이미지를 텍스트 형태(Base64)로 변환하여 JavaScript 파일에 직접 포함. 소형 이미지에 적합.
       * asset: 파일 크기에 따라 resource 또는 inline 자동 선택(기본값: 8kb)
       */
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // 이미지 파일 확장자
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 대상
        type: 'asset/resource', // 폰트는 이미지보다 훨씬 용량이 크고, 자주 바뀌지 않는 정적 자원. 브라우저가 캐싱하여 네트워크 비용을 줄일 수 있도록 항상 별도 파일로 제공
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/features': path.resolve(__dirname, 'src/features'),
    },
  },
};
