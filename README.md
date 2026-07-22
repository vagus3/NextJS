This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Auth Email Setup

Password reset emails are sent through Resend.

Required environment variables:

```bash
BETTER_AUTH_SECRET=your-secret
SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxx
AUTH_EMAIL_FROM=Your App <no-reply@your-domain.com>
AUTH_EMAIL_SITE_NAME=NextMaster
```

For Convex cloud/dev deployments, set the mail-related secrets in Convex as well:

```bash
npx convex env set SITE_URL http://localhost:3000
npx convex env set RESEND_API_KEY re_xxxxxxxxx
npx convex env set AUTH_EMAIL_FROM "Your App <no-reply@your-domain.com>"
npx convex env set AUTH_EMAIL_SITE_NAME NextMaster
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
