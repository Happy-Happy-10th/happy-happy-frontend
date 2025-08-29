import React, { Suspense } from 'react';

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return <Suspense>{props.children}</Suspense>;
}

export default Layout;
