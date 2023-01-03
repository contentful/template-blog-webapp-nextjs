import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { title, publishedDate } = article;

  return (
    <Link className="flex flex-col" href={`/${article.slug}`}>
      <div
        className={twMerge(
          'flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg',
          className,
        )}
      >
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{ className: 'object-cover aspect-[16/10] w-full' }}
            {...article.featuredImage}
          />
        )}
        <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && <p className="h3 mb-2 text-gray800 md:mb-3">{title}</p>}

          <div className="mt-auto flex items-center">
            <ArticleAuthor article={article} />
            <div className={twMerge('ml-auto pl-2 text-xs text-gray600')}>
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
