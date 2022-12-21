export enum ContentfulParams {
  xray = 'xray',
  preview = 'preview',
  reset = 'reset',
  domain = 'domain',
  deliveryToken = 'delivery_token',
  previewToken = 'preview_token',
  spaceId = 'space_id',
}

export const guestSpaceOptionalParameters = [ContentfulParams.domain];
export const guestSpaceRequiredParameters = [
  ContentfulParams.spaceId,
  ContentfulParams.deliveryToken,
  ContentfulParams.previewToken,
];
export const editorialParameters = [ContentfulParams.preview, ContentfulParams.xray];
export const resetParam = 'reset';
