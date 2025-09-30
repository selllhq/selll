# Selll

Selll enables everyday Africans start and scale their business online with their own website, online payments, order/customer management and logistics without any tech skills or complex paperwork. For now, Selll is only available to Ghanaian businesses, but we plan to expand to other African countries soon.

## App Info

This app is created with [Leaf PHP](https://leafphp.dev), a simple and fast PHP micro-framework. It uses v4 of Leaf with the Leaf MVC setup. It uses [React](https://reactjs.org/) for the frontend, powered by [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/) for styling, and [Inertia.js](https://inertiajs.com/) for seamless server-driven single-page apps.

This app contains:

- The dashboard for vendors to manage their stores
- The public-facing API for fetching stores and products
- The payments service for handling payments with [PayStack](https://paystack.com)
- API for the upcoming Selll mobile application
- Background job processing with [Leaf Queue](https://leafphp.dev/docs/utils/queues)

## Installation

To get everything set up, first clone the repository:

```bash
git clone https://github.com/yourusername/selll.git
cd selll
```

Then install the dependencies using the Leaf CLI or Composer/Npm:

```bash
leaf install
```

or

```bash
composer install
npm install
```

## System dependencies

To run this application, you need to have:

- PHP 7.4 or higher
- Composer
- Node.js and npm
- A database (PostgreSQL & SQLite)

## Configuration

## Database creation

To create your database tables, add your database credentials in the `.env` file:

```bash
php leaf db:migrate
```

To get the full functionality of the app, you need a few third party services. You can set them up in the `.env` file:

- Google for auth
- PayStack for payments
- An email service like Mailgun or SMTP
- Mapbox for maps
- An SMS service like Africa's Talking (We use Arkesel for now)
- A bucket storage service like AWS S3 or DigitalOcean Spaces (We use Cloudflare R2 for now)
- A Redis server for sessions (optional)
- Mixpanel for analytics (optional)

This will add your database tables in the postgres database, and will create an sqlite database file for the queue jobs.

## Running the app

To start the development server, run:

```bash
leaf serve
```

Or with composer/npm

```bash
npm run dev
php -S localhost:5500 -t public # in another terminal
```

You can then access the app at `http://localhost:5500`.

## Deployment instructions

We use [Fly.io](https://fly.io) to deploy the app, but you can deploy it anywhere that supports PHP apps. Just make sure to set up your environment variables and database correctly.

You can refer to the dockerfile in the root of the project for an idea of how to set up the app in a Linux environment.
