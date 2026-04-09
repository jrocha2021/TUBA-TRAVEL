# Tuba Travel

Multilingual tourism MVP for Cabo Verde built with Next.js, TypeScript, Tailwind CSS, and the App Router.

## Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- App Router
- Resend for contact-form email delivery

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```env
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_TO_EMAIL=your-inbox@example.com
CONTACT_FROM_EMAIL=Tuba Travel <noreply@send.tubatours.com>
```

3. Start the development server:

```bash
npm run dev
```

4. Open:

- `http://localhost:3000/en`
- `http://localhost:3000/fr`
- `http://localhost:3000/pt`

## Production Check

Run a production build:

```bash
npm run build
```

Start the production server locally:

```bash
npm start
```

## Contact Form Environment Variables

The contact form API route depends on these server-side variables:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

These must be configured in local development and in production.

## Deploying to Vercel

Vercel is the easiest deployment option for this project because:

- Next.js App Router works with zero custom server setup
- environment variables are easy to manage
- API routes work naturally for the contact form
- image optimization is handled automatically

### Vercel Steps

1. Push this project to GitHub.
2. Go to Vercel and import the GitHub repository.
3. Let Vercel detect the framework as Next.js.
4. Add these environment variables in the Vercel project settings:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
5. Deploy the project.

### After Deployment

1. Open the deployed site.
2. Test:
   - homepage
   - destinations
   - experiences
   - about
   - contact
3. Submit the contact form with a real test inquiry.
4. Confirm:
   - success message appears
   - inquiry email arrives in the inbox configured in `CONTACT_TO_EMAIL`

## Notes

- The contact email route runs on the Node.js runtime.
- Remote images are loaded through Next.js image optimization.
- Translation content lives in the `messages/` folder.
