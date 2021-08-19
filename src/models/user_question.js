import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

userQuestionSchema = new Schema({
  question: { type: ObjectId, required: true, ref: "Question" },
  answer: { type: String },
  userId: { type: ObjectId, required: true, ref: "User" },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

userQuestionSchema.plugin(mongoosePaginate);

export const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);