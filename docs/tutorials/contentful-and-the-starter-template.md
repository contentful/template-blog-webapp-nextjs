# DISCLAIMER ⚠️

The Starter Templates experience is currently only available to new users.

To benefit from this experience, please follow this link to create a new
account and select the template to install: [https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template](https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&utm_source=github.com&utm_medium=referral&utm_campaign=template-blog-webapp-nextjs).

Alternatively, to immediately start the auto installation of this template after creating a new account,
please follow this link:
[https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog](https://www.contentful.com/starter-templates/nextjs-blog/sign-up/?action=create_starter_template&template_name=blog&utm_source=github.com&utm_medium=referral&utm_campaign=template-blog-webapp-nextjs).


$~$

## Begin your journey with Contentful and the Blog Starter Template

After reading this document, you will be able to:

- Understand some of the core features of Contentful (content model, content type, entry, reference).
- Understand the relationship between Contentful and the Starter Template:
  - Edit an entry, and see the update in the Starter Template application (online/locally).
  - Edit a content type in the Contentful web app, as well as in the Starter Template's code.

$~$

### Contentful core features

#### What is a content model

A content model is the foundation of every great digital project. Your model is the bones of your project; it tells our APIs what kind of content to send to your end application. In short, a content model gives structure and organization to your content.

Designing your content model is a critical step in building a solid, efficient, and future-proof application with Contentful.

---

#### What is a content type

Within your overall content model, you’ll have individual content types. You can think of each content type as an outline for your content; it tells you what data will be contained within each individual entry. Think of the content type as the “stencil” for the “drawing” that will be your entry.

Each content type is made up of fields that denote the type of data that will be included in the entry. For example, the title of a web page or news article would have its own text field, the body would have another, and there would also be fields to include any media files.

---

#### What is an entry

An entry is a piece of content created from a content model, Contentful provides an editor to create content.

---

#### What is a reference

A reference is a field type you can add to your content type. This field gives you the ability to link one or multiple entries to another.

$~$

### Relationship between Contentful and the Starter Template

In the previous step, we learned the basics of Contentful's core features.

Now, we will explore the relationship between Contentful and the Starter Template frontend layer, by using the `Homepage` entry as an example.

Note that from now on, we will refer to the Contentful application, as the `web app`.

> **Pre-requisites:**
>
> To follow the next steps, make sure you are logged into [https://app.contentful.com/](https://app.contentful.com/).

$~$

#### Homepage - Entry

Start by opening the `Homepage` entry, you have several ways to do so:

- From anywhere in the web app, press `Q` to open the Quick search, search for `Homepage`, and click on the item in the results.
- From the main navigation bar, click on Content, search for `Homepage` in the text field, and click on the item in the results.

You will be directed to the `Homepage` entry editor, where you will see the structure and fields, which are outlined by the `📄 page - Landing` content type:

- The SEO metadata (title, description, meta tags...).
- A featured blog post
  

1. Edit the `Featured blog post` field by selecting a different blog post to feature on the homepage, the changes are saved automatically.
2. Open the preview to see the changes, by clicking on the `Open preview` button in the right entry sidebar.
3. You should see the changes, they are only visible to you until you decide to publish them, this is made possible thanks to the preview mode.

NOTE: you can also see the changes by running the Starter Template application locally, after completing the [setup](../../README.md/#getting-started). You will have to publish the changes, as the preview mode is only available from Contentful.

---

#### Homepage - Content type

In the previous step, we explored the `Homepage` entry's structure and edited the `Featured blog post`.

Now, we are going to edit the `📄 page - Landing` content type to understand its relationship with the Starter Template source code.

> **Pre-requisites:**
>
> To follow the next steps, make sure you have completed the [Starter Template setup](../../README.md/#getting-started) and that the Starter Template application is running locally, at [http://localhost:3000](http://localhost:3000).

$~$

#### Edit the content type in the web app

Start by opening the `📄 page - Landing` content type, you have several ways to do so:

- From anywhere in the web app, press `Q` to open the Quick search, search for `📄 page - Landing`, and click on the item in the results.
- From the main navigation bar, click on the `Content model` link, search for `📄 page - Landing` in the text field, and click on the item in the results.

From the `📄 page - Landing` content type page:

1. Add a new field, by clicking on the `Add field` button in the right sidebar.
2. Select the `Text` field.
3. Give the `Greeting` a name (it will appear in the entry editor).
4. Keep the default options.
5. Click **Create**.
6. Re-organize the new field by dragging and dropping it to the top of the list.
7. Save the changes, by clicking on the `Save` button in the top right corner.

The new field is now available, let's add a value in the `Homepage` entry:

- Go to the `Homepage` entry editor (see [Homepage - Entry](#homepage---entry) to do so).
- Add a value to the `Greeting` field.
- Publish the changes by clicking on the `Publish changes` button in the right entry sidebar.

---

#### Edit the content type in the Starter Template source code

Now, let's connect the new `Greeting` field to our Starter Template source code:

- In your terminal of choice, run `yarn run graphql-codegen:watch`, this script will sync the Starter Template's source code with the web app content models, and generate the necessary updated typings files, as soon as a change is made in a `.graphql` file.
  - In our case, it will update the typings of our `📄 page - Landing` content type, to make the `Greeting` field available.
- Open the `pageLanding.graphql` file, this file represents the query made to Contentful to get the `📄 page - Landing` content type fields values
  - Follow the comment in the file, line #6, save the changes.
- Open the `index.page.tsx` file.
  - Follow the comments in the file starting line #25, save the changes.
- Navigate to the running Starter Template application, [http://localhost:3000/](http://localhost:3000/)
  - If the application is not running yet, in your terminal of choice, run `yarn dev`.
- You should see the `Greeting` field on the homepage.

$~$

## Wrap up

We summarized the fundamentals of Contentful's core features (content model, content type, entry, reference), as well as the relationship between Contentful and the Starter Template source code.

You are now equipped to make this Starter Template your own and utilize the full potential of Contentful.

Have a great journey with Contentful!

$~$

## Support

If you have a problem with this Starter Template, post a message in our [Contentful Community Slack](https://www.contentful.com/slack/).

Can't find your answer there? You can file a feedback issue through [this template](https://github.com/contentful/template-blog-webapp-nextjs/tree/main/.github/ISSUE_TEMPLATE/feedback.md).

If you have other problems with Contentful not related to the Starter Template, you can contact the [Customer Support](https://support.contentful.com/).

$~$

## Notes

- [Contentful Web App Overview](https://www.contentful.com/help/contentful-web-app-overview/)
- [Content Modelling Basics](https://www.contentful.com/help/content-modelling-basics/)
- [References](https://www.contentful.com/help/references/)
- [Entry Editor](https://www.contentful.com/help/entry-editor/)
