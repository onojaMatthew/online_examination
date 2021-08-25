import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { type: String , unique: true },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
}, { timestamps: true });

adminSchema.plugin(mongoosePaginate);

export const Admin = mongoose.model("Admin", adminSchema);