# GCA website

Run the website locally with Node.js 20 and npm. If you use nvm, run these
commands from the repository root:

```sh
nvm install
nvm use
npm ci
npm start
```

Open http://localhost:3000. Stop the server with Ctrl+C.

`npm start` serves the pages in `public/` and the local API routes. Local posts
and membership applications are saved in the ignored `data/` directory, and
uploaded images are saved in `public/uploads/`.

The public pages and local posts/application storage run without an `.env`
file. Firebase sign-in and the member directory require the project's
`FIREBASE_*` environment variables in `.env`, including
`FIREBASE_SERVICE_ACCOUNT` for the member directory. Sending application status
emails also requires `RESEND_API_KEY`.
