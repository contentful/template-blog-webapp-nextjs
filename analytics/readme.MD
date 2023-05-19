# Segment / Typewriter

This repository uses Segment / Typewriter for clientside tracing. For more information please
see https://contentful.atlassian.net/wiki/spaces/PROD/pages/4138500311/Templates+-+Segment+tracking

This document aims at providing additional information in the context of this codebase.

## TL:DR;

Make sure you have all the correct environment variables set up, then simply running `yarn install` and `yarn dev`
should configure everything automatically. If this does not work make sure you have the environment variables set up and
correctly and then try to run `yarn typewriter:init`

---

## Introduction

Normally in order to set up Typewriter, you would call `npx typewriter init` as described in their docs
on https://github.com/segmentio/typewriter and https://segment.com/docs/protocols/apis-and-extensions/typewriter/.
However, this repository has already done most of the setup, and only relies on a last few steps.

The `typewriter init` command generates a `typewriter.yml` configuration file that is consequently used to run
any `typewriter` command. During the initialisation process it prompts the user for an API token and to select tracking
plans. The API token can be plucked from an environment variable, but the tracking plans cannot. Because of this design
choice, we cannot use two different Segment configurations (a staging and production one for example) based on
environment variables.

To work around this, we are generating our `typewriter.yml` file based on a template. This allows us to dynamically
generate a file, on different variables beyond the possibilities that Typewriter offers out of the box. We've automated
all of this, after installing, and running a `dev` command, Typewriter will be automatically initialised and
configured.

**In theory this should all run automagically but if you manage to break it here's how it works** ✨.

### Environment variables

The following environment variables are required for the Typewriter implementation to work.

```dotenv
NEXT_PUBLIC_SEGMENT_WRITEKEY=
SEGMENT_TRACKINGPLAN_ID=
SEGMENT_TYPEWRITER_API_TOKEN=
```

Where to find the values is documented on https://contentful.atlassian.net/wiki/spaces/PROD/pages/edit-v2/4138500311.

### Related files

The aforementioned variables are used in a few places:

- `src/_ctf-private/ctf-analytics` contains the logic that inject the tracking snippet and initialises the Typewriter
  config. It also sets up error handling
- `analytics` contains all files generates by Typewriter, this readme and some utility file
- `typewriter.example.yml` the template file that is going to generate our `typewriter.yml` file

### NPM scripts

We run these scripts at various points; we run the `init` script during the prepare phase, and the `update` command
whenever a `dev` command is ran. If there ever is an issue with the `typewriter.yml`
file, `yarn typewriter:init` could be ran to attempt to resolve the issue.

```npm
  "typewriter:init": "node analytics/generateTypewriterConfig.js",
  "typewriter:update": "yarn typewriter --update"
```
