import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Template({ children }: Props) {
  return <>{children}</>;
  return (
    <div className="flex flex-col mx-auto h-dvh w-full sm:w-[393px] md:w-[600px] shadow-[0_0_12px_rgba(0,0,0,0.1)] p-4">
      {children}
    </div>
  );
}

export default Template;
