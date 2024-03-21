import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ImageProps {
  nextImageProps?: Omit<NextImageProps, 'src' | 'alt'>;
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
}

export const CtfImage = ({ file, title, nextImageProps }: ImageProps) => {
  if (!file) return null;

  const {
    url,
    details: {
      image: { width, height },
    },
  } = file;

  const formattedUrl = `https:${url}`;
  const blurURL = new URL(formattedUrl);
  blurURL.searchParams.set('w', '10');

  return (
    <NextImage
      src={formattedUrl}
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
