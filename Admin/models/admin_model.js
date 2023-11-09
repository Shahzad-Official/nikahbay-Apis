import mongoose, { Schema, model } from "mongoose";

var adminSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    tokenAuth: {
      type: Boolean,
      default: false,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Admin = model("admin", adminSchema);

export default Admin;
