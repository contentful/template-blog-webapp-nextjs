import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

import { CtfToolboxDynamic } from '@src/_ctf-private';

interface LayoutPropsInterface {
  children: ReactNode;
}

const CtfSignUpBanner = dynamic(
  () => import('@src/_ctf-private/ctf-sign-up-banner/CtfSignUpBanner'),
);

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const { referrer } = router.query;

  return (
    <>
      {referrer && <CtfSignUpBanner />}
      <Header />
      {children}
      <Footer />
      <CtfToolboxDynamic />
    </>
  );
};
