import { twMerge } from 'tailwind-merge';

import { CtfXrayFrameDynamic } from '@src/_ctf-private/ctf-xray';
import { CtfImage } from '@src/components/features/contentful';
import { RichImageFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleImageProps {
  image: RichImageFieldsFragment;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  return image.image ? (
    <CtfXrayFrameDynamic entry={image}>
      <figure>
        <div className="flex justify-center">
          <CtfImage
            nextImageProps={{
              className: twMerge(
                'mt-0 mb-0 ',
                image.fullWidth
                  ? 'md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0'
                  : 'rounded-2xl border border-gray300 shadow-lg',
              ),
            }}
            {...image.image}
          />
        </div>
        {image.caption && <figcaption className="mt-4">{image.caption}</figcaption>}
      </figure>
    </CtfXrayFrameDynamic>
  ) : null;
};
