import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  return articles && articles.length > 0 ? (
    <div
      className={twMerge(
        'grid grid-cols-1 gap-y-4 gap-x-5 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12',
        className,
      )}
      {...props}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} /> : null;
      })}
    </div>
  ) : null;
};
