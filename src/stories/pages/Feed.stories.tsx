import type { Meta, StoryObj } from '@storybook/nextjs';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import FeedPage from '@/components/layouts/FeedPage';

const meta: Meta<typeof FeedPage> = {
  title: 'pages/FeedPage',
  component: FeedPage,
};

export default meta;
type Story = StoryObj<typeof FeedPage>;

export const feedPage: Story = {
  render: args => (
    <div className="w-screen h-screen">
      <ServiceLayout>
        <FeedPage />
      </ServiceLayout>
    </div>
  ),
};
