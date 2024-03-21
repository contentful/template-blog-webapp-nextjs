import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { twMerge } from 'tailwind-merge';

import { CtfImage } from '@src/components/features/contentful';

interface ArticleImageProps {
  image: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.title });
  return image.file ? (
    <figure>
      <div className="flex justify-center" {...inspectorProps({ fieldId: 'image' })}>
        <CtfImage
          nextImageProps={{
            className: twMerge(
              'mt-0 mb-0 ',
              image.file.details.image.width > 800
                ? 'md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0'
                : 'rounded-2xl border border-gray300 shadow-lg',
            ),
          }}
          {...image}
        />
      </div>
      {image.description && (
        <figcaption className="mt-4" {...inspectorProps({ fieldId: 'caption' })}>
          {image.description}
        </figcaption>
      )}
    </figure>
  ) : null;
};
