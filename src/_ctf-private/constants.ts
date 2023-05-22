export enum ContentfulParams {
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
export const editorialParameters = [ContentfulParams.preview];
export const resetParam = 'reset';
