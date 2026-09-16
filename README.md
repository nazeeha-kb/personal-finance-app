# Personal Finance App

A personal finance dashboard built with Next.js, Clerk authentication, Prisma, and PostgreSQL. The app helps users track spending, manage budgets, monitor savings pots, and review recurring bills in a clean, responsive interface.


## Live Link
Try the App: https://moneyboard-app.vercel.app/

## Overview

This project is based on the Frontend Mentor Personal Finance App challenge and extends it into a full-stack application with authentication and persistent data storage.

It includes:

- Overview dashboard summarizing financial activity
- Transaction management with search, sort, and filtering
- Budget creation and tracking
- Savings pots with add/withdraw flows
- Recurring bill tracking
- Responsive, keyboard-friendly UI
- User authentication via Clerk
- Persistent data layer using Prisma + PostgreSQL

## Tech Stack

- [Next.js](https://nextjs.org/) - App framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Clerk](https://clerk.com/) - Authentication
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

## Features

### Dashboard / Overview
- High-level financial overview
- Quick access to key sections
- Navigation across app features

### Transactions
- View transaction list with pagination
- Search by name
- Sort by date, amount, and alphabetic fields
- Filter by category

### Budgets
- Create, update, and remove budgets
- Track spending against category limits
- Review recent category activity
- See totals and category-specific usage

### Saving Pots
- Create savings goals
- Add funds to a pot
- Withdraw funds from a pot
- Delete pots and return balances appropriately

### Recurring Bills
- Review bills by vendor
- Display paid vs upcoming monthly payments
- Search and sort recurring expenses

### Authentication
- Sign in / sign up flows using Clerk
- Protected dashboard routes
- User-specific persistence for budgets and pots

### UX
- Responsive layout for mobile, tablet, and desktop
- Hover, focus, and keyboard-friendly interaction states
- Clean analytics-style UI

## Project Structure

```bash
.
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── forms/
│   ├── layout/
│   ├── transactions/
│   └── ui/
├── lib/
│   ├── generated/
│   ├── prisma.js
│   ├── budgets.js
│   ├── pots.js
│   ├── users.js
│   └── utils.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── data/
│   └── data.json
├── .env
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── README.md
└── README-template.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database
- Clerk account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd personal-finance-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables.

Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/overview
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/overview
DATABASE_URL=your_postgresql_connection_string
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the app:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

```bash
npm run dev      # start the Next.js development server
npm run build    # generate Prisma client and create production build
npm run start    # run the production build
npm run lint     # run ESLint
```

## Database

This app uses Prisma with PostgreSQL. The database model currently supports:

- `User`
- `Budget`
- `Pot`

The schema is defined in `prisma/schema.prisma`.

## Notes

- The project is designed to work with Clerk authentication and a connected PostgreSQL database.
- The app uses the challenge data as the foundation for its interactive finance experience.
- Some parts of the UI and data logic are still evolving, and the codebase is structured to support further feature expansion.

## License

This project is for learning and portfolio purposes. Please review the Frontend Mentor challenge terms for usage constraints related to the design and assets.

## Challenge Context

This repository was built to complete the Frontend Mentor challenge for a personal finance app, with a full-stack implementation layered on top of the original UI specification.
