import type { Preview } from '@storybook/nextjs';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    docs:{
      defaultName: "Introduction",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
