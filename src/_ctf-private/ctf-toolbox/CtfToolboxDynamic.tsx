import dynamic from 'next/dynamic';

const DynamicToolbox = dynamic(() => import('./CtfToolbox').then(module => module.CtfToolbox), {
  ssr: false,
});
export const CtfToolboxDynamic = () => {
  return <DynamicToolbox />;
};
