# ShopSphere Frontend

Frontend for the ShopSphere ecommerce app, built with React, Redux Toolkit, React Router, and Tailwind CSS.

## Tech Stack

- React 18
- Redux Toolkit + React Redux
- React Router v6
- Tailwind CSS
- React Hook Form
- React Alert

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Install

1. Open a terminal in this folder:

   `frontend-ShopSphere`

2. Install dependencies:

   `npm install`

3. Start the frontend:

   `npm start`

4. Open:

   `http://localhost:3000`

## Scripts

- `npm start` - run development server
- `npm test` - run tests in watch mode
- `npm run build` - create production build

## Backend dependency

The API base URL comes from `REACT_APP_API_URL` (see `.env` and `.env.production`). The default in code matches the deployed API at `https://shopsphere-lu1j.onrender.com`. For a local backend, set `REACT_APP_API_URL=http://localhost:8080` in `.env` and restart `npm start`.

## Screenshots / Images

Add your UI screenshots here later.

Suggested image folder:

- `frontend-ShopSphere/docs/images/`

Example placeholders:

- Home page: `docs/images/home.png`
- Product detail page: `docs/images/product-detail.png`
- Checkout page: `docs/images/checkout.png`
- Payment gateway page: `docs/images/payment-gateway.png`

## Notes

- Keep frontend and backend running together for full functionality.
- If PowerShell blocks npm scripts on Windows, use `npm.cmd` instead of `npm`.
