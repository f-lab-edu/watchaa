const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const tanstackRouter = require('@tanstack/router-plugin/webpack').tanstackRouter;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 기존 빌드 파일 제거
  },
  plugins: [
    tanstackRouter({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    // HTML 파일을 템플릿으로 등록해두면, 웹팩이 알아서 필요한 JavaScript와 CSS 파일을 자동으로 삽입
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 파일 경로
      filename: 'index.html', // 생성될 HTML 파일 이름
      inject: 'body', // 스크립트를 body 태그 끝에 삽입
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false, // 타입 체크가 완료된 후에 빌드 완료. 타입 오류가 있는 경우 빌드가 실패됨.
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`, // 환경별 .env 파일 경로
    }),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
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
              presets: [
                '@babel/preset-env', // 최신 JS 문법을 변환
                ['@babel/preset-react', { runtime: 'automatic' }], // JSX를 순수 JS로 변환
                '@babel/preset-typescript', // TS를 JS로 변환
              ],
              plugins: [
                // 개발 환경에서만 React Refresh 플러그인 적용
                !isProduction && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
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
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};
