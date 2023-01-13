import Link from 'next/link';
import { ReactNode } from 'react';

import { useContentfulEditorialStore } from '@src/_ctf-private';
import { Sys } from '@src/lib/__generated/sdk';

export interface CtfXrayFrameProps {
  children: ReactNode;
  entry: {
    __typename?: string;
    sys: Pick<Sys, 'id' | 'spaceId'>;
    internalName?: string | null | undefined;
  };
}
export const CtfXrayFrame = ({ entry }: CtfXrayFrameProps) => {
  const { xray, domain } = useContentfulEditorialStore();
  const contentfulUrl = `https://app.${domain}/spaces/${entry.sys.spaceId}/entries/${entry.sys.id}`;

  return xray ? (
    <div className="pointer-events-none absolute top-0 left-0 z-[1] z-10 h-full w-full border-[1px] border-dashed border-gray600">
      <Link
        className="pointer-events-auto absolute bottom-full left-0 inline-block max-w-full bg-gray300 px-2 py-1"
        href={contentfulUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
        }}>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-colorBlack">
          <strong>{entry.__typename}</strong>
          {entry.internalName && <span> | {entry.internalName}</span>}
        </p>
      </Link>
    </div>
  ) : null;
};
