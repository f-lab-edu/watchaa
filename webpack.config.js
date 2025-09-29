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
      /**
       * CSS 처리
       * 배열의 마지막 loader부터 순서대로 적용됨
       */
      {
        test: /\.css$/,
        use: [
          'style-loader', //  CSS를 <style> 태그로 주입
          'css-loader', //  CSS를 JavaScript 모듈로 변환
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
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 대상
        type: 'asset/resource', // 폰트는 이미지보다 훨씬 용량이 크고, 자주 바뀌지 않는 정적 자원. 브라우저가 캐싱하여 네트워크 비용을 줄일 수 있도록 항상 별도 파일로 제공
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
