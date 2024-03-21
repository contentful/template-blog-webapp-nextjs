import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfRichText } from '@src/components/features/contentful';

interface ArticleContentProps {
  article: {
    sys: {
      id: string;
    };
    fields: {
      content?: {
        json: any;
        links: any;
      };
    };
  };
}
export const ArticleContent = ({ article }: ArticleContentProps) => {
  const { content } = article.fields;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <div {...inspectorProps({ fieldId: 'content' })}>
      <CtfRichText content={content} />
    </div>
  );
};
