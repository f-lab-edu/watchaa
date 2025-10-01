import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default merge(common, {
  mode: 'production',
  /**
   * source-map 설정
   * prod: hidden-source-map - 별도의 소스맵 파일 생성, 에러 스택트레이스에 소스맵 URL 포함하지 않음(보안상 유리)
   */
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        /**
         * 프로덕션 모드: MiniCssExtractPlugin.loader 사용하여 CSS를 별도 파일로 추출
         */
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', // PostCSS 로더 추가
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 프로덕션 모드에서는 CSS를 별도 파일로 추출하여 브라우저가 캐싱할 수 있도록 함
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all', // 모든 청크에 대해 코드 분할을 수행합니다.
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // node_modules 폴더의 모듈을 대상으로 합니다.
          name: 'vendors', // 분리된 청크의 이름을 지정합니다.
          chunks: 'all',
        },
      },
    },
  },
});
