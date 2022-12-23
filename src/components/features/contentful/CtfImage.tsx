import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

interface ImageProps extends Omit<ImageFieldsFragment, '__typename'> {
  nextImageProps?: Omit<NextImageProps, 'src' | 'alt'>;
}

export const CtfImage = ({ url, width, height, title, nextImageProps }: ImageProps) => {
  if (!url || !width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set('w', '10');

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={title || ''}
      sizes="(max-width: 1200px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...nextImageProps}
      className={twMerge(nextImageProps?.className, 'transition-all')}
    />
  );
};
