import { ReactNode } from 'react';

import { useContentfulEditorialStore } from '@src/_ctf-private';
import { Sys } from '@src/lib/__generated/sdk';
import typewriter from 'analytics';

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

  const handleOnClick = e => {
    e.stopPropagation();

    typewriter.contentModelInteracted({
      entryTypeName: entry.__typename || '',
      entryInternalName: entry.internalName || '',
      entryLink: contentfulUrl,
    });

    window.open(contentfulUrl, '_blank', 'noopener noreferrer');
  };

  return xray ? (
    <div className="pointer-events-none absolute top-0 left-0 z-[1] h-full w-full border-[1px] border-dashed border-gray600">
      <button
        title={`${entry.__typename}${entry.internalName ? ` | ${entry.internalName}` : ''}`}
        className="pointer-events-auto absolute bottom-full left-0 inline-block max-w-full bg-gray300 px-2 py-1"
        onClick={handleOnClick}>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-colorBlack">
          <strong>{entry.__typename}</strong>
          {entry.internalName && <span> | {entry.internalName}</span>}
        </p>
      </button>
    </div>
  ) : null;
};
