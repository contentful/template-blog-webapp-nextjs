import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

import { CtfToolboxDynamic } from '@src/_ctf-private';
import { CtfSignUpBanner } from '@src/_ctf-private/ctf-sign-up-banner';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <>
      <CtfSignUpBanner />
      <Header />
      {children}
      <Footer />
      <CtfToolboxDynamic />
    </>
  );
};
