import { Box } from '@/components/base';
import { Icon, SplashIcon, SplashTextIcon } from '@/components/base/Icon';
import { Meta, StoryObj } from '@storybook/nextjs';
import { motion } from 'motion/react';

const meta: Meta = {
  title: 'pages/splash-screen',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <Box className="w-screen h-dvh bg-yoteyo-gray-100">
        <Box className="w-full md:w-[600px] h-full bg-white mx-auto shadow-[0_0_12px_rgba(0,0,0,0.1)] ">
          <Box className="w-full h-full bg-yoteyo-main flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(50px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Icon className="w-48 h-48">
                <SplashIcon />
              </Icon>
            </motion.div>
            <motion.div
              className="mt-18"
              initial={{ opacity: 0, transform: 'translateY(50px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Icon className="w-48">
                <img src="/logo.png" alt="" />
                {/* <SplashTextIcon /> */}
              </Icon>
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  },
};
