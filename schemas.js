import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  active: { type: Boolean, default: true },
});
export const Admin = mongoose.model("Admin", AdminSchema);

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  email: { type: String },
  accounts: { type: [String] },
  active: { type: Boolean, default: true },
});
export const User = mongoose.model("User", UserSchema);

const TransactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accountNumber: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);
export const Transaction = mongoose.model("Transaction", TransactionSchema);
