import { NextApiRequest, NextApiResponse } from 'next';

import { createPreviewClient } from './create-preview-client';

export type GuestSpaceParams = {
  domain?: 'contentful.com' | 'flinkly.com' | 'quirely.com';
  delivery_token?: string;
  preview_token?: string;
  space_id?: string;
};

/**
 * Enriches a response with previewData (more context on that down below). It allows us to send additional data to serverside functions such as gSP and gSSP.
 * Because Next their Preview Mode is deprecated, we instead we Draft Mode. Draft Mode however does not yet have an equivalent to previewData, so until that is available we rely on it to return the guest space parameter / preview data to our serverside logic in our pages.
 * Returns a preview API client
 *
 * Next Preview mode: https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode
 * Next Draft mode: https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode
 *
 *
 * @param {NextApiRequest} req - A Next.js API route request
 * @param {NextApiResponse} res - A Next.js API route response
 */
export const handleGuestSpaceParams = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    domain = 'contentful.com',
    delivery_token,
    preview_token,
    space_id,
  } = req.query as GuestSpaceParams;

  res.setPreviewData({ domain, delivery_token, preview_token, space_id });

  return createPreviewClient({ domain, delivery_token, preview_token, space_id });
};
