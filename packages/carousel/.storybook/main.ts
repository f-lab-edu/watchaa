import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  viteFinal: async (config) => {
    /**
     * Remove vite-plugin-dts for Storybook build (readable version)
     * @see https://github.com/qmhc/unplugin-dts/issues/275
     */
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (plugin && typeof plugin === 'object' && 'name' in plugin) {
          return plugin.name !== 'vite:dts';
        }

        return true;
      });
    }
    if (config.build) {
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.output = {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      };
    }
    return config;
  },
};

export default config;
