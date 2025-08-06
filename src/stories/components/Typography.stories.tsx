import { Box, Button, Text } from '@/components/base';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { motion } from 'motion/react';

const meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <Box className="flex-col  w-full gap-y-2">
        <Text variant="title1" className="xl">
          Title1
        </Text>
        <Text variant="title2">Title2</Text>
        <Text variant="title3">Title3</Text>
        <Text variant="title4">Title4</Text>

        <Text variant="body1">Body1</Text>
        <Text variant="body2">Body2</Text>
        <Text variant="body3">Body3</Text>
        <Text variant="body4">Body4</Text>

        <Text variant="detail1">Detail1</Text>
        <Text variant="detail1">Detail2</Text>
      </Box>
    );
  },
};

export const Typewriter: Story = {
  render: () => {
    const sentenceVariants = {
      hidden: {},
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    };

    const letterVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    };

    const text = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque fugit repellendus iusto a consequuntur mollitia voluptatum explicabo laudantium distinctio incidunt, expedita labore tempora, nemo accusamus totam voluptas delectus debitis eum impedit. Voluptas commodi exercitationem, animi eveniet totam, non nemo eligendi ratione accusantium dolores quasi error tempora omnis id corporis itaque delectus natus vero pariatur officia. Sed temporibus explicabo vero. Voluptatibus ipsa architecto minus ducimus cumque ipsam quaerat sequi suscipit dolorum, quod voluptates molestiae, consequuntur, et alias nam libero? Consequatur doloremque magni voluptatibus quisquam ipsum error quos excepturi beatae? Molestiae repellendus aliquam iusto et ex nesciunt totam illum corporis dolores voluptatum!`;

    return (
      <Box>
        <motion.p key={text} variants={sentenceVariants} initial="hidden" animate="visible">
          {text.split('').map((char, i) => (
            <motion.span key={`${char}-${i}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>
      </Box>
    );
  },
};
