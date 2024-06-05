# Training calendar scraper

This is an experiment in creating a web-app out of an R script - the output of the R script was
needed regularly, so had to be run by someone with an R environment set up. This webapp
should perform the same actions each time the page is loaded, by scraping the page
for our training calendar and reformatting it into HTML.

**NB:** probably still requires some debugging, should be checked against the existing R script.

## Notes on web-scraping with JavaScript/TypeScript

* This was more difficult than expected! Not sure if there is much of a "data analysis" ecosystem
  in JavaScript yet
* Couldn't find a simple existing tool to grab a HTML table - the table had to be parsed manually
* Once parsed (and type-annotated with TypeScript), processing the data was fairly straightforward
* Deploying the web-app as a static page through GitHub Pages was straightforward

## Project setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
