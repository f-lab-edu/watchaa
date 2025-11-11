// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import baseConfig from '@watchaa/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [...baseConfig, ...storybook.configs['flat/recommended']];
