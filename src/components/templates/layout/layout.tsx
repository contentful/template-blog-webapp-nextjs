import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

import { CtfToolboxDynamic } from '@src/_ctf-private';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CtfToolboxDynamic />
    </>
  );
};
