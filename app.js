import express from "express";
import mongoose from "mongoose";
import { Transaction, User } from "./schemas.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Set up default mongoose connection
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, {
  autoIndex: true,
  autoCreate: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const error = (status, msg) => {
  var err = new Error(msg);
  err.status = status;
  return err;
};

app.use(express.json());

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use("/api", (req, res, next) => {
  const key = req.query["api-key"];

  // key isn't present
  if (!key) return next(error(400, "api key required"));

  // key is invalid
  if (apiKeys.indexOf(key) === -1) return next(error(401, "invalid api key"));

  // all good, store req.key for route access
  req.key = key;
  next();
});

const apiKeys = [process.env.SECRET_API_KEY];

// example: http://localhost:3000/api/users
app.post("/api/users", async (req, res) => {
  const data = req.body;
  let newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    accounts: [data.accountNumber],
  });
  try {
    newUser = await newUser.save();
    res.send({ message: "New User created", newUser: newUser });
  } catch (error) {
    res.status(404);
    res.send({ error: "Sorry, can't find that" });
  }
});

// example: http://localhost:3000/api/users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// example: http://localhost:3000/api/transactions
app.post("/api/transactions", async (req, res) => {
  const data = req.body;
  let newTransaction = new Transaction({
    userId: data.userId,
    accountNumber: data.accountNumber,
    amount: data.amount,
  });
  try {
    newTransaction = await newTransaction.save();
    res.send({
      message: "New Transaction created",
      newTransaction: newTransaction,
    });
  } catch (error) {
    res.status(404);
    res.send({ error: "Sorry, can't find that" });
  }
});

// example: http://localhost:3000/api/transactions
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use((err, req, res, next) => {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use((req, res) => {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
