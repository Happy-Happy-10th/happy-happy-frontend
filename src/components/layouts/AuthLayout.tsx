import React from 'react';
import { Box } from '../base';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Box className="w-screen h-dvh bg-yoteyo-gray-100">
      <Box className="w-full flex-col md:w-[600px] h-full bg-white mx-auto shadow-[0_0_12px_rgba(0,0,0,0.1)]">
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
