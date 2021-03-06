import { Header } from 'components/Common';
import * as React from 'react';

interface DefaultProps {
  children: JSX.Element;
}

export function Default({ children }: DefaultProps) {
  return (
    <>
      <Header />
      <main className="py-20">{children}</main>
    </>
  );
}
