import tailwindcssPostcss from '@tailwindcss/postcss';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [tailwindcssPostcss(), postcssPresetEnv()],
};
