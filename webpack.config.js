// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 기존 빌드 파일 제거
  },
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
  plugins: [
    // HTML 파일을 템플릿으로 등록해두면, 웹팩이 알아서 필요한 JavaScript와 CSS 파일을 자동으로 삽입
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
