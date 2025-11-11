import type { Preview } from '@storybook/react-vite';

import './tailwind.css';
import '../src/carousel.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="tailwind-scope">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
