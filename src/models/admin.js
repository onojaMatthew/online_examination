import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String , unique: true },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

export const Amin = mongoose.model("Admin", adminSchema);