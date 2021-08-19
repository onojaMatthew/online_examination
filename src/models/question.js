import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {  type: String, required: [true, "Question is required"], unique: [true, "Question already exists"] },
  answer: { type: String, required: [ true, "The real answer is required" ] },
  optionA: { type: String, required: [ true, "Option A is required" ] },
  optionB: { type: String, required: [ true, "Option B is required" ] },
  optionC: { type: String, required: [ true, "Option C is required" ] },
  optionD: { type: String, required: [ true, "Option D is required" ] },
  optionE: { type: String, required: [ true, "Option E is required" ] }
}, { timestamps: true });

questionSchema.plugin(mongoosePaginate);

export const Question = mongoose.model("Question", questionSchema);
export default questionSchema;