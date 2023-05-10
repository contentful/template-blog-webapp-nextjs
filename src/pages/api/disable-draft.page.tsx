export default async function exit(_, res) {
  // Exit the current user from "Draft Mode". This function accepts no args.
  res.setDraftMode({ enable: false });

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });
  res.end();
}
