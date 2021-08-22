import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import questionSchema  from "./question";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  phone: { type: String },
}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

export const User = mongoose.model("User", userSchema);
export default userSchema;