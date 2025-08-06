'use client';

import { Box, Icon, SplashIcon } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <AuthLayout>
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
          onAnimationComplete={event => {
            router.replace('/introduce');
          }}
        >
          <img className="w-48" src="./images/yoteyo-text.png" alt="요때요 텍스트 이미지" />
        </motion.div>
      </Box>
    </AuthLayout>
  );
}
