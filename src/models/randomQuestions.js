import mongoose from "mongoose";
import { Question} from "./question";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

const randomSchema = new Schema({
  questions: [{
    question: { type: ObjectId, ref: Question },
    user_answer: { type: String, default: ""}
  }]
}, { timestamps: true });

export const RandomQuestions = mongoose.model("RandomQuestions", randomSchema);