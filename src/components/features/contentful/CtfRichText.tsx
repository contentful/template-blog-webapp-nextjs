import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

export type EmbeddedEntryType = ImageFieldsFragment | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
}

// export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
//   switch (entry?.__typename) {
//     case 'ComponentVimeo':
//       return <Vimeo videoProps={entry} />;
//     case 'ComponentImage':
//       return <CtfImage {...entry} />;
//     default:
//       return null;
//   }
// };

// const RichTextStyling = styled(Box)`
//   ${props => css`
//     p {
//       display: flex;
//       flex-wrap: wrap;
//       column-gap: 1.2em;
//
//       + ul,
//       + ol {
//         margin-top: 1em;
//         margin-bottom: 0;
//       }
//
//       + h1,
//       + h2,
//       + h3,
//       + h4,
//       + h5,
//       + h6 {
//         margin-top: 1.2em;
//         margin-bottom: 0;
//       }
//     }
//
//     h1,
//     h2,
//     h3,
//     h4,
//     h5,
//     h6,
//     ul,
//     ol,
//     p {
//       + p {
//         margin-top: 1.2em;
//         margin-bottom: 0;
//       }
//     }
//
//     * + .embedded-entry--block,
//     .embedded-entry--block + * {
//       margin-top: 1.4em;
//     }
//
//     .embedded-entry--block {
//       display: block;
//     }
//
//     .embedded-entry--inline {
//       display: inline-block;
//       flex: 1;
//     }
//
//     @media screen and (min-width: ${(props.theme as Theme).breakpoints.lg}) {
//       * + .embedded-entry--block,
//       .embedded-entry--block + * {
//         margin-top: 4em;
//       }
//     }
//   `}
// `;

export const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id,
      );

      if (!entry) return null;

      return <>--PLACEHOLDER-- Embedded entry --PLACEHOLDER--</>;

      // return (
      //   <Box as="span" className="embedded-entry embedded-entry--block">
      //     <EmbeddedEntry {...entry} />
      //   </Box>
      // );
    },
  },
});

export const CtfRichText = ({ json, links }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, json });

  return <div>{documentToReactComponents(json, baseOptions)}</div>;
};
