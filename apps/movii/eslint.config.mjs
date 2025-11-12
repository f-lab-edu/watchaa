import baseConfig from '@movii/eslint-config';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';

export default [...pluginTanstackQuery.configs['flat/recommended'], ...baseConfig];
