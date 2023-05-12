import { NextApiRequest, NextApiResponse } from 'next';

import { handleGuestSpaceParams } from '@src/pages/utils/handle-guest-space-params';

export type QueryParams = {
  secret: string;
  slug?: string;
  locale?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug, locale } = req.query as QueryParams;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Handle guest space parameters
  const previewClient = handleGuestSpaceParams(req, res);

  // Check for a slug, if no slug is passed we assume we need to redirect to the root
  if (slug) {
    try {
      const blogPageData = await previewClient.pageBlogPost({
        slug,
        locale,
        preview: true,
      });

      const blogPost = blogPageData.pageBlogPostCollection?.items[0];

      if (!blogPost) {
        throw Error();
      }

      // Enable Draft Mode by setting the cookies
      res.setDraftMode({ enable: true });

      // Redirect to the path from the fetched post
      res.redirect(`/${locale ? `${locale}/` : ''}${blogPost?.slug}`);
    } catch {
      return res.status(401).json({ message: 'Page not found' });
    }
  } else {
    try {
      const landingPageData = await previewClient.pageLanding({
        locale,
        preview: true,
      });

      if (!landingPageData) {
        throw Error();
      }

      // Enable Draft Mode by setting the cookies
      res.setDraftMode({ enable: true });

      // Redirect to the root
      res.redirect(`/${locale ? `${locale}` : ''}`);
    } catch {
      return res.status(401).json({ message: 'Page not found' });
    }
  }
};
