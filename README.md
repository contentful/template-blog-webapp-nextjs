# Contentful Blog Starter Template

A Blog Starter Template powered by Next.js & Contentful, pre-designed with optimized & adjustable pages, components, and data management.

![The homepage of the Blog Starter Template](blog-starter-template.jpg 'The homepage of the Blog Starter Template')

$~$

## What is Contentful?

[Contentful](https://www.contentful.com/) provides content infrastructure for digital teams to power websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management, and delivery APIs, and a customizable web app that enables developers and content creators to ship their products faster.

$~$

## DISCLAIMER ⚠️

The Starter Templates experience is currently only available to new users.

To benefit from this experience, please follow this link to create a new
account and select the template to install: [https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template](https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&utm_source=github.com&utm_medium=referral&utm_campaign=template-blog-webapp-nextjs).

Alternatively, to immediately start the auto installation of this template after creating a new account,
please follow this link:
[https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog](https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog&utm_source=github.com&utm_medium=referral&utm_campaign=template-blog-webapp-nextjs).

$~$

## Begin your journey with Contentful and the Blog Starter Template

Follow this [guide](https://github.com/contentful/template-blog-webapp-nextjs/blob/main/docs/tutorials/contentful-and-the-starter-template.md/?utm_source=github.com-guide&utm_medium=referral&utm_campaign=template-blog-webapp-nextjs) to understand the relationship between
Contentful and the Starter Template source code through guided steps:

- Entry editing, and updates preview in the Starter Template application (online/locally)
- Content type editing in the Contentful web app, as well as in the Starter Template's code

$~$

## Features

- Composable content through powerful & flexible content modeling.
- Localization ready.
- SEO ready.
- Incremental Static Regeneration with Next.js[^1].
- Generation of GraphQL[^2] typed code (schema, and types), in sync with the content types through graphql-codegen[^3].
- Enhanced Developer Experience with TypeScript[^4].

$~$

## Getting started

To get started, read the following guidelines.

- [Environment variables](./README.md#environment-variables)
- [Dependencies](./README.md#dependencies)
- [Development](./README.md#development)
- [Contentful API & GraphQL](./README.md#contentful-api--graphql)
- [Deployment](./README.md#deployment)

$~$

### Environment variables

In order to authenticate the requests to the Contentful APIs, the following values are necessary:

- Your space ID: [https://www.contentful.com/help/find-space-id/](https://www.contentful.com/help/find-space-id/)
- Contentful Delivery API token: [https://www.contentful.com/developers/docs/references/content-delivery-api/](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- Contentful Preview API token: [https://www.contentful.com/developers/docs/references/content-preview-api/](https://www.contentful.com/developers/docs/references/content-preview-api/)

Rename the `.env.example` file to `.env` and add the necessary values.

$~$

### Dependencies

To install the necessary dependencies, run:

```bash
yarn
```

### Run the Starter Template in development mode

```bash
yarn dev
```

The Starter Template should be up and running on `http://localhost:3000`.

All necessary dependencies are installed under `node_modules` and any necessary tools can be accessed via npm scripts.

$~$

## Development

### Node

It is recommended to use the Node version listed in the `.nvmrc` file, we recommend using [nvm](https://github.com/nvm-sh/nvm) to easily switch between Node versions.

$~$

### Husky & git hooks

This repository makes use of [Husky](https://github.com/typicode/husky) to enforce commit hooks.

The config for both the `pre-commit` and `pre-push` hooks can be found in the `.husky` folder, located in the root of the project.

---

#### Pre-commit

Before allowing a commit, we require a successful result from the TypeScript compiler (`tsc`) and our `lint-staged` script will be run.

This ensures all ESLint and Prettier rules are enforced on the files that are staged to be committed.

The `tsc` command is run separately from the `lint-staged` step because we require the Typescript compiler to sample _all_ files.

This is important to ensure that no deviating types were introduced by the [codegen](./README.md#graphql--code-generation) for example.

---

#### Pre-push

The same two tasks are run for pre-push and for pre-commit.

---

#### Overriding the Husky git hooks

In case of wanting to bypass the `pre-commit` or `pre-push` hooks, pass a `--noVerify` flag to your Git commands.

⚠️ Make sure you only use this if you know why you're using it. ⚠️

$~$

### Contentful API & GraphQL

This project makes use of Contentful's [GraphQL API](https://www.contentful.com/developers/docs/references/graphql/).

API calls made to the Contentful GraphQL endpoint are made through `graphql-request`.

The types are generated from the `.graphql` files located in the `/lib/graphql/` directory:

1. `lib/graphql/[fileName].graphql` is detected by the [codegen](./README.md#graphql--code-generation)
2. `lib/__generated/sdk.ts` is generated
3. Within the generated file, their types and a new `getSdk` function are generated
4. The `getSdk` function can now be imported and used within the `getStaticProps` in the pages files

$~$

### GraphQL & code generation

We use `graphql-codegen` to generate a type-safe API client, utilizing [GraphQLClient](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-graphql-request) as the "client".

---

#### Commands

In order to (re-)generate the GraphQL schema, types and sdk, please use either of the following commands:

- `yarn graphql-codegen:generate` generates a schema, types and code to fetch data from the Contentful APIs
- `yarn graphql-codegen:watch` similar to the `generate` command, but it runs as a watch task which will rerun the steps when changes are made in the `.graphql` files

The first steps of the codegen generate files that contain the GraphQL schema and matching TypeScript types. All these files are located in the `src/lib/graphql` folder.
They're generated to the `src/lib/__generated` folder and ought to be committed once altered/added to the repository.

The TS types for these files are generated in the same location, in a `__generated` folder and like the other files ought to be committed.

---

#### Configuration

The configuration for the codegen can be found in `codegen.ts`, located in the root of the project.

$~$

---

$~$

## Deployment

The Starter Template can be deployed to your hosting provider of choice.

We offer integrations with Vercel and Netlify to speed up the process by clicking one of the deploy buttons below. The GitHub repository and
the necessary environment variables keys are pre-configured in the hosting provider space.

| Vercel                                                                                                                                                                                                                                                                                                                                                                                                               | Netlify                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcontentful%2Ftemplate-blog-webapp-nextjs&env=CONTENTFUL_SPACE_ID,CONTENTFUL_ACCESS_TOKEN,CONTENTFUL_PREVIEW_ACCESS_TOKEN&envDescription=API%20Keys%20needed%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fcontentful%2Ftemplate-blog-webapp-nextjs%23environment-variables) | [![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fcontentful%2Ftemplate-blog-webapp-nextjs#CONTENTFUL_SPACE_ID=&CONTENTFUL_ACCESS_TOKEN=&CONTENTFUL_PREVIEW_ACCESS_TOKEN=) |
| [Environment variables docs](https://vercel.com/docs/concepts/projects/environment-variables)                                                                                                                                                                                                                                                                                                                        | [Environment variables docs](https://docs.netlify.com/environment-variables/overview/)                                                                                                                                                                                           |

Make sure to add the necessary [environment variables values](./README.md#environment-variables) to the hosting provider
environment variables.

---

## Content preview

Once you have the Starter Template deployed on your hosting provider, you can update the Content preview URL in your space settings.

You can follow our guide to learn how to do
so: [https://www.contentful.com/help/setup-content-preview](https://www.contentful.com/help/setup-content-preview/?utm_source=github.com-preview-guide&utm_medium=referral&utm_campaign=template-marketing-webapp-nextjs).

For the live preview the basic field tagging for the inspector mode and live updates are already implemented.
For custom components, you can find the instructions at our [guide](https://www.contentful.com/developers/docs/tutorials/general/live-preview/).

### Adjustments in code

1. Set a unique value for `process.env.CONTENTFUL_PREVIEW_SECRET` in your environment variables. This value should be kept secret and only known to the API route and the CMS.
2. Configure the entry preview URLs in Contentful to match the draft API route's URL structure. This can be done in the Contentful web interface under "Settings" for each content type. For more information see: https://www.contentful.com/help/setup-content-preview/#preview-content-in-your-online-environment
3. The draft mode API route is already written in the app and can be found in `src/app/api/enable-draft/route.ts`. This route checks for a valid secret and slug before redirecting to the corresponding page\*.

_\*The `slug` field is optional; When not passed we redirect the page to the root of the domain._

### Adjustments in Contentful

1. Next, you will need to configure your Contentful space to use the correct preview URLs. To do this, go to the "Settings" section of your space, and click on the "Content Preview" tab. From here, you can configure the preview URLs for each of your content models.
2. Edit all content models that need a preview url. We usually expect that to only be the models prefixed with `📄 page -`.
3. Add a new URL with the following format: `https://<your-site>/api/enable-draft?path=%2F{locale}%2F{entry.fields.slug}&x-contentful-preview-secret=<token>`. Make sure to replace `<your-site>` with the URL of your Next.js site, and `<token>` with the value of `process.env.CONTENTFUL_PREVIEW_SECRET`.
4. Now, when you view an unpublished entry in Contentful, you should see a "Preview" button that will take you to the preview URL for that entry. Clicking this button should show you a preview of the entry on your Next.js site, using the draft API route that we set up earlier.


$~$

---

$~$

## Support

If you have a problem with this Starter Template, post a message in our [Contentful Community Slack](https://www.contentful.com/slack/).

Can't find your answer there? You can file a feedback issue through [this template](https://github.com/contentful/template-blog-webapp-nextjs/tree/main/.github/ISSUE_TEMPLATE/feedback.md).

If you have other problems with Contentful not related to the Starter Template, you can contact the [Customer Support](https://support.contentful.com/).

$~$

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

$~$

## License

MIT License, see [LICENSE](./LICENSE).

$~$

<!-- FOOTNOTES -->

[^1]: [Next.js docs](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
[^2]: [GraphQL docs](https://graphql.org/learn/)
[^3]: [graphql-codegen](https://www.the-guild.dev/graphql/codegen)
[^4]: [TypeScript](https://www.typescriptlang.org/)
[^note]: [React docs](https://reactjs.org/docs/getting-started.html)
