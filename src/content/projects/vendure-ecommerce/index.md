---
title: "Vendure for eCommerce"
description: "Exploring Vendure to prototype an eComemrce store"
date: "01/07/2026"
repoURL: "https://github.com/pmeaney/vendure-juniper010726/"
---

## Exploring use of Vendure for ecommerce consulting projects

In the Summer of 2025, I began exploring Content Management Systems and really liked PayloadCMS, a Typescript-based framework. However, PayloadCMS's ecommerce plugin is still in beta mode as of early 2026.

So, after learning about [Vendure](https://vendure.io/) I began exploring its "my-shop" template. It looked well built, easy to figure out, and easy to get up and running.

However, its template wasn't Containerized. I decided to take it upon myself to create a containerized template and set it up for production-ready CICD Deployment, a project I call [vendure-juniper010726](https://github.com/pmeaney/vendure-juniper010726/). (As a nature-lover decided to give my projects tree-species code names, for eventual blue-green deployment, using tree names instead of colors)

On January 30, 2026 I released v2.0-- the Prototype Production version. Next up, I'll add:

- Additional security features to the Debian server (March 2026)
- Placeholder products (3/1/26)
- Initial point-of-sale software accounts (Stripe, Paypal) for initial payment testing (March 2026)

Once those items are working, I'll release v3.0 -- the Production Ready version. And if all goes according to plan, I'll have a simple dropshipping store side-hustle.

<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Read more about my Vendure eCommerce project via my blog posts:</p>
      <ul>
       <li><a class="font-bold"  href="https://www.pmeaney.com/blog/01-dev-prod" target="_blank">Vendure eCommerce up and running with Dev & Prod</a></li>
       <li><a class="font-bold" href="https://www.pmeaney.com/blog/02-migration-and-seeding" target="_blank">Vendure eCommerce migration & seeding</a></li>
       <li><a class="font-bold" href="https://www.pmeaney.com/blog/03-seeding-featured-products" target="_blank">How to setup a Featured Products collection</a></li></ul>
    </div>
  </div>
</div>
