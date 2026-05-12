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

const allowedOrigins = new Set([
  ...splitOrigins(process.env.FRONTEND_URL),
  ...splitOrigins(process.env.FRONTEND_URL_2),
  ...splitOrigins(process.env.ALLOWED_ORIGINS),
  "http://localhost:3000",
]);

function isVercelPreviewOrigin(origin) {
  if (process.env.ALLOW_VERCEL_PREVIEW_ORIGINS !== "true") return false;
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

//middlewares

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin) || isVercelPreviewOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
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
