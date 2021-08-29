import mongoose from "mongoose";
import { User } from "./user";
import { RandomQuestions } from "./randomQuestions";

const { Schema, ObjectId } = mongoose;

const userQuestionSchema = new Schema({
  questions: { type: ObjectId, ref: RandomQuestions },
  time: { type: String },
  userId: { type: ObjectId, ref: User },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);