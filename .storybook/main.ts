import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // 배포 환경(GitHub Actions)에서만 publicPath 수정
    if (process.env.NODE_ENV === 'production' && config.output) {
      config.output.publicPath = '/happy-happy-frontend/';
    }
    return config;
  },
};

export default config;
