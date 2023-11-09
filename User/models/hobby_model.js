import { Schema, model } from "mongoose";

var hobbySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    hobby: {
      type: String,
      unique:true,
      required: true,
    },
  },
  { versionKey: false }
);
const Hobby = model("hobbies", hobbySchema);
export default Hobby;
