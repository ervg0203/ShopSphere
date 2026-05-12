const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const PORT = process.env.PORT || 8080;

function splitOrigins(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Browsers send Origin without a path; env URLs often include a trailing slash. */
function normalizeOrigin(origin) {
  if (!origin) return origin;
  try {
    const u = new URL(origin);
    return `${u.protocol}//${u.host}`;
  } catch {
    return origin.replace(/\/+$/, "");
  }
}

const allowedOrigins = new Set(
  [
    ...splitOrigins(process.env.FRONTEND_URL),
    ...splitOrigins(process.env.FRONTEND_URL_2),
    ...splitOrigins(process.env.ALLOWED_ORIGINS),
    "http://localhost:3000",
  ].map(normalizeOrigin),
);

function isVercelAppOrigin(origin) {
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/** Default: allow https://*.vercel.app. Set ALLOW_VERCEL_PREVIEW_ORIGINS=false to require env-listed origins only. */
function allowVercelWildcard() {
  return process.env.ALLOW_VERCEL_PREVIEW_ORIGINS !== "false";
}

//middlewares

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.has(normalized)) {
        return callback(null, true);
      }
      if (allowVercelWildcard() && isVercelAppOrigin(origin)) {
        return callback(null, true);
      }
      // Do not pass Error — that triggers Express 500 with no CORS headers (browser shows a generic CORS failure).
      return callback(null, false);
    },
    exposedHeaders: ["X-Total-Count"],
  }),
);
server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

main().catch((err) => {
  console.error("Database connection failed:", err.message);
  process.exit(1);
});

async function main() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error(
      "MONGO_URI is missing. Add it to your environment variables.",
    );
  }

  await mongoose.connect(mongoURI);
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
