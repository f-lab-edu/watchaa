import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import baseConfig from '@movii/eslint-config';

export default [...pluginTanstackQuery.configs['flat/recommended'], ...baseConfig];
