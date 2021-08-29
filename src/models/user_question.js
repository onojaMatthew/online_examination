import mongoose from "mongoose";
import { User } from "./user";
import { RandomQuestions } from "./randomQuestions";

const { Schema, ObjectId } = mongoose;

const userQuestionSchema = new Schema({
  questions: [{ 
    question: { type: String, default: ""},
    answer: { type: String, default: ""},
    optionA: { type: String, default: ""},
    optionB: { type: String, default: ""},
    optionC: { type: String, default: ""},
    optionD: { type: String, default: ""},
    optionE: { type: String, default: ""},
    user_answer: { type: String, default: ""}
  }],
  time: { type: String },
  userId: { type: ObjectId, ref: User },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);