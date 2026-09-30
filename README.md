# Lindon

Lindon is a full-stack shortlet apartment booking platform built with Next.js.

The project is designed around a simple guest booking experience, allowing visitors to explore apartments, check availability, make reservations, and manage their stays from a dedicated guest area.

## Features

* Apartment listings and detail pages
* Apartment image galleries and amenities
* Availability calendar
* Date conflict detection
* Google authentication with Auth.js
* Guest account area
* Reservation management
* Edit upcoming reservations
* Cancel upcoming reservations
* Past reservation history
* Guest profile and phone number management
* Server-side booking validation
* PostgreSQL database with Prisma
* Cached apartment and booking queries
* Responsive design

## Tech Stack

* Next.js
* React
* JavaScript
* Sass / SCSS Modules
* Prisma
* PostgreSQL
* Auth.js
* Google OAuth
* React Day Picker
* date-fns
* Leaflet
* Vercel

## Booking Flow

Visitors can browse the apartments without signing in.

They can select an apartment, view its details, and check available dates through the availability calendar.

A guest signs in with Google before creating a reservation.

Once a reservation is created, the guest can access it from the Guest Area where they can:

* View upcoming reservations
* View past reservations
* View reservation details
* Edit upcoming reservations
* Cancel upcoming reservations
* Update their phone number

## Project Structure

```text
app/
├── account/
│   ├── login/
│   └── (protected)/
│       ├── reservations/
│       └── profile/
│
├── apartments/
│   └── [slug]/
│
├── api/
│   └── auth/
│
├── components/
└── page.jsx

lib/
├── queries/
├── auth.js
└── prisma.js

prisma/
└── schema.prisma
```

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables:

```env
DATABASE_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Database

Lindon uses Prisma with PostgreSQL.

After configuring your database, run:

```bash
npx prisma migrate dev
```

Generate the Prisma client with:

```bash
npx prisma generate
```

## Authentication

Authentication is handled by Auth.js with Google OAuth.

For local development, configure the Google OAuth application with:

```text
http://localhost:3000/api/auth/callback/google
```

The required Google credentials should be stored in environment variables and should never be committed to the repository.

## Deployment

The application can be deployed to Vercel or another platform that supports Next.js.

Make sure the production environment includes the required database, authentication, and Google OAuth environment variables.

## Project Status

Lindon is a portfolio/pitch project demonstrating a full-stack accommodation booking workflow with authentication, availability management, reservations, and guest account functionality.
