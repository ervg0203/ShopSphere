# ShopSphere 🛒

ShopSphere is a full-stack ecommerce web application built using the MERN stack.  
It provides a modern online shopping experience with features like product browsing, authentication, cart management, order handling, and admin functionalities.

---

# 🚀 Tech Stack

## Frontend
- React 18
- Redux Toolkit
- React Router v6
- Tailwind CSS
- React Hook Form
- React Alert

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors

---

# 📂 Project Structure

```bash
ShopSphere/
│
├── frontend-ShopSphere/
│
└── backend-ShopSphere/
```

---

# ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account or local MongoDB setup

---

# 🔐 Environment Variables

## Backend `.env`

Create a `.env` file inside:

```bash
backend-ShopSphere/
```

Add:

```env
MONGO_URI=<your_mongodb_connection_string>
```

Example:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

⚠️ Do not commit real credentials.

---

## Frontend `.env`

Create a `.env` file inside:

```bash
frontend-ShopSphere/
```

Add:

```env
REACT_APP_API_URL=http://localhost:8080
```

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone <your_repository_url>
cd ShopSphere
```

---

# 🖥️ Backend Setup

Open terminal inside:

```bash
backend-ShopSphere
```

## Install Dependencies

```bash
npm install
```

## Run Backend

### Production Mode

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:8080
```

Health Check:

```bash
GET /
```

---

# 🎨 Frontend Setup

Open another terminal inside:

```bash
frontend-ShopSphere
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔗 API Route Groups

| Route | Description |
|---|---|
| `/products` | Product APIs |
| `/categories` | Category APIs |
| `/brands` | Brand APIs |
| `/users` | User APIs |
| `/auth` | Authentication APIs |
| `/cart` | Cart APIs |
| `/orders` | Order APIs |

---

# ✨ Features

## User Features
- User Authentication
- Product Listing
- Product Details
- Category Filtering
- Brand Filtering
- Add to Cart
- Order Placement
- Responsive UI

## Admin Features
- Manage Products
- Manage Orders
- Manage Categories
- Manage Brands
- User Management

---

# 📸 Screenshots

<img width="1918" height="867" alt="Screenshot 2026-05-13 013423" src="https://github.com/user-attachments/assets/20e8ba63-1506-4df4-b759-bedb503d16e0" />

<img width="1901" height="863" alt="Screenshot 2026-05-13 013710" src="https://github.com/user-attachments/assets/a100498e-bcb4-4654-b1df-cb7aa6aaabb6" />

<img width="1901" height="870" alt="Screenshot 2026-05-13 013739" src="https://github.com/user-attachments/assets/9eb17858-2c4c-4b60-866c-240ee44b49e3" />

<img width="1901" height="870" alt="Screenshot 2026-05-13 013820" src="https://github.com/user-attachments/assets/867a0cd7-4582-4ba0-b956-e1cf6165f4dd" />

<img width="1897" height="862" alt="Screenshot 2026-05-13 013456" src="https://github.com/user-attachments/assets/7faf2990-dfc5-4df4-95bc-bb394f1b37c4" />

<img width="1896" height="861" alt="Screenshot 2026-05-13 013521" src="https://github.com/user-attachments/assets/93273aed-8575-4f35-9ea8-624edb000dce" />

<img width="1897" height="866" alt="Screenshot 2026-05-13 013621" src="https://github.com/user-attachments/assets/5b8ec23c-4cf1-42ac-bf16-fe3ee363e42e" />


# 🛠️ Available Scripts

## Frontend

| Command | Description |
|---|---|
| `npm start` | Run development server |
| `npm test` | Run tests |
| `npm run build` | Create production build |

## Backend

| Command | Description |
|---|---|
| `npm start` | Run backend server |
| `npm run dev` | Run backend with auto reload |

---

# 🌐 Frontend & Backend Integration

The frontend communicates with the backend API using:

```env
REACT_APP_API_URL
```

For local development:

```env
REACT_APP_API_URL=http://localhost:8080
```

Default deployed backend:

```bash
https://shopsphere-lu1j.onrender.com
```

Make sure the backend server is running before starting the frontend.

---

# ⚠️ Notes

- Keep both frontend and backend running together for full functionality.
- Ensure your MongoDB URI is valid and URL-safe.
- If PowerShell blocks npm scripts on Windows, use:

```bash
npm.cmd install
npm.cmd start
```

instead of:

```bash
npm install
npm start
```

---

# 📌 Future Improvements

- Payment Gateway Integration
- Wishlist Feature
- Product Reviews & Ratings
- Search & Sorting
- Order Tracking
- Email Notifications

---

# 👨‍💻 Author

Developed by Vaibhav Kumar

---
