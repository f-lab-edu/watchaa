import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import rspack from '@rspack/core';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';
import { merge } from 'webpack-merge';

import common from './rspack.common.mjs';

/**
 * @type {import('@rspack/cli').Configuration}
 */
export default merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
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
         * 프로덕션 모드: CssExtractRspackPlugin.loader 사용하여 CSS를 별도 파일로 추출
         */
        use: [
          rspack.CssExtractRspackPlugin.loader,
          'css-loader',
          'postcss-loader', // PostCSS 로더 추가
        ],
      },
    ],
  },
  plugins: [
    new TsCheckerRspackPlugin({
      async: false, // 타입 체크가 완료된 후에 빌드 완료. 타입 오류가 있는 경우 빌드가 실패됨.
    }),
    // 프로덕션 모드에서는 CSS를 별도 파일로 추출하여 브라우저가 캐싱할 수 있도록 함
    new rspack.CssExtractRspackPlugin({ filename: '[name].[contenthash].css' }),
    process.env.ANALYZE === 'true' && new RsdoctorRspackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new rspack.LightningCssMinimizerRspackPlugin(),
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          minify: true, // 코드 최소화 활성화
          compress: true, // 공백, 주석 제거 등 코드 최소화
          mangle: true, // 변수명, 함수명 난독화
        },
        extractComments: false, // 별도의 라이선스 파일 생성 방지
      }),
    ],
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
