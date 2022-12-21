# Contentful utilities

This piece of documentation describes the utilities offered for Contentful, including the `guest space` functionality,
the `xray` and `preview` mode works in this repository, and documents what files are related to the feature.

This feature belongs in the `main-private` branch, and as such during development any files that are created are marked
with a TODO to indicate that the file is marked for being moved to the private branch

```tsx
/**
 * TODO: this is a main-private feature, and should be removed from the main branch during the split
 */
```

## Co-location in the feature folder

We'll try to co-locate all code required for this feature, to be exported from this feature folder. So
replacement/removal later will be easy.

## Storing and persisting the data

We use `Zustand` to store and persist all data in sessionStorage. Values are set, updated and deleted in the `Zustand`
store which in turn persists it all.

## Enable the guest space

_All variables mentioned in this section are exported from the `./constants.ts` file._

To enable the guest space, we require all `guestSpaceRequiredParameters` to be passed to the URL. In
addition, `guestSpaceOptionalParameters` can optionally be passed.

Passing _at least_ the required parameters will cause them to be set in the persisted storage. Any updates to the
parameters, require you to pass a full set of parameters. After initially setting them, passing a single value will not
update it. For example:

**This will work**

```
delivery_token=[your_delivery_token]&preview_token=[your_preview_token]&space_id=[your_space_id]
```

**This will not**
ALL required parameters will need to be passed, in order to set or update the parameters in persisted storage.

```
delivery_token=[your_delivery_token]&preview_token=[your_preview_token]
```

## Reset/disable the guest space

The guest space can be reset/disabled by passing a `reset` parameter. The `reset` param will clear the persisted storage
of `guestSpaceRequiredParameters` and `guestSpaceOptionalParameters`, it will not touch the `editorialParameters`.

In addition to clearing the persisted storage, the `reset` parameter prevent a `React-Query` client to be used at all.

## Additional packages used for the guest space

These additional packages were added for the support of the guest space, they should be moved when the split happens.

```
    "@tanstack/react-query": "^4.19.0",
    "zustand": "^4.1.4"
```

## Preview mode

To enable the `preview` mode, pass `&preview=true`, it does not rely on the `guestSpaceRequiredParameters` to be passed,
but without it simply won't fetch preview data.

## xRay mode

To enable the `xray` mode, pass `&xray=true`
