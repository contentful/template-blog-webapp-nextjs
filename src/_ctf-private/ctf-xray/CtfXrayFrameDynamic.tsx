import dynamic from 'next/dynamic';

import { CtfXrayFrameProps } from '@src/_ctf-private/ctf-xray/CtfXrayFrame';

const DynamicXrayFrame = dynamic(
  () => import('./CtfXrayFrame').then(module => module.CtfXrayFrame),
  {
    ssr: false,
  },
);
export const CtfXrayFrameDynamic = (props: CtfXrayFrameProps) => {
  return (
    <div className="relative z-[1]">
      {props.children}
      <DynamicXrayFrame {...props} />
    </div>
  );
};
