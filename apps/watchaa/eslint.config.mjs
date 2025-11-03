import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import baseConfig from '@watchaa/eslint-config';

export default [...pluginTanstackQuery.configs['flat/recommended'], ...baseConfig];
