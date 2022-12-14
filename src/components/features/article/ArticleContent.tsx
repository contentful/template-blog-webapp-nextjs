import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { CtfRichText } from '@src/components/features/contentful';
import { Container } from '@src/components/shared/container';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleContentProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}
export const ArticleContent = ({ article, className, ...props }: ArticleContentProps) => {
  const { content } = article;

  return (
    <Container className={twMerge('max-w-4xl', className)} {...props}>
      <CtfRichText json={content?.json} links={content?.links} />
    </Container>
  );
};
