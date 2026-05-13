# ShopSphere Backend

Backend API for the ShopSphere ecommerce app, built with Node.js, Express, and MongoDB (Mongoose).

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- dotenv
- cors

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB connection string

## Environment Variables

Create/update `.env` in this folder with:

`MONGO_URI=<your_mongodb_connection_string>`

Example:

`MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority`

Do not commit real credentials.

## Install

1. Open a terminal in this folder:

   `backend-ShopSphere`

2. Install dependencies:

   `npm install`

3. Start backend (production mode):

   `npm start`

Or start in dev mode with auto-reload:

`npm run dev`

## Server

- Base URL: `http://localhost:8080`
- Health check: `GET /`

## API Route Groups

- `/products`
- `/categories`
- `/brands`
- `/users`
- `/auth`
- `/cart`
- `/orders`

## Frontend Integration

The frontend app is configured to call this backend at `http://localhost:8080`.
Run this backend first, then start the frontend.
- Orders API sample response: `docs/images/orders-response.png`

## Notes

- If PowerShell blocks npm scripts on Windows, use `npm.cmd` instead of `npm`.
- Ensure `MONGO_URI` is URL-safe and valid before starting the server.
