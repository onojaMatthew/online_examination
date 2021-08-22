import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import userSchema from "./user";
import questionSchema from "./question";

const { Schema } = mongoose;

const userQuestionSchema = new Schema({
  questions: [{
    question: { type: questionSchema, default: "" },
    user_answer: { type: String, default: "" },
  }],
  time: { type: String },
  userId: { type: userSchema },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

userQuestionSchema.plugin(mongoosePaginate);

export const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);