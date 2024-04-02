import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';

interface ArticleAuthorProps {
  article: {
    sys: {
      id: string;
    };
    fields: {
      internalName: string;
      author: {
        sys: {
          id: string;
        };
        fields: {
          name: string;
          avatar: {
            sys: {
              id: string;
            };
            fields: {
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
          };
        };
      };
      publishedDate: Date;
      title: string;
      shortDescription: string;
      slug: string;
      featuredImage: any;
    };
  };
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = article.fields;
  const inspectorProps = useContentfulInspectorMode({ entryId: author?.sys?.id });

  return (
    <div className="flex items-center">
      <div
        className="mr-2 overflow-hidden rounded-full border border-blue500"
        {...inspectorProps({ fieldId: 'avatar' })}
      >
        {author?.fields?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author?.fields?.avatar.fields}
          />
        )}
      </div>
      <span className="text-xs leading-none text-gray600" {...inspectorProps({ fieldId: 'name' })}>
        {author?.fields?.name}
      </span>
    </div>
  );
};
