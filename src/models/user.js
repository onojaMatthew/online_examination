import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  domain_name: { type: String },
  phone: { type: String },
  has_interview: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

export const User = mongoose.model("User", userSchema);
export default userSchema;