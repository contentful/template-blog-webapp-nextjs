import { previewClient } from '@src/lib/client';

export default async (req, res) => {
  const { secret, slug, locale } = req.query;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

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

      // Enable Preview Mode by setting the cookies
      res.setDraftMode({ enable: true });

      // Redirect to the path from the fetched post
      res.redirect(`/${locale ? `${locale}/` : ''}${blogPost?.slug}`);
    } catch {
      return res.status(401).json({ message: 'Invalid slug' });
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

      // Enable Preview Mode by setting the cookies
      res.setDraftMode({ enable: true });

      // Redirect to the root
      res.redirect(`/${locale ? `${locale}` : ''}`);
    } catch {
      return res.status(401).json({ message: 'Page not found' });
    }
  }
};
