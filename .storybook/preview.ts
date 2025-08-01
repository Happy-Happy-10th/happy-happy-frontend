import type { Preview } from '@storybook/nextjs';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../src/styles/global.css';
import './preview.css';

export const customViewports = {
  mobileSmall: {
    name: 'Mobile-Small (320px*600px)',
    styles: {
      width: '320px',
      height: '600px',
    },
  },
  mobileLarge: {
    name: 'Mobile-Large (380px*870px)',
    styles: {
      width: '380px',
      height: '870px',
    },
  },
  tablet: {
    name: 'Tablet-Portrait (768px*1024px)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  tabletLandscape: {
    name: 'Tablet-Landscape (1024px*768px)',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  desktop: {
    name: 'PC (1280px*900px)',
    styles: {
      width: '1300px',
      height: '900px',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
        options:{
          ...customViewports
        },
      defaultViewport: "desktop", // optional: 기본 뷰포트
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
