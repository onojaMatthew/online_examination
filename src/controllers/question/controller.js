import { Question } from "../../models/question";
import { success, error } from "../../config/response";

export const create = async (req, res) => {
  const { question, answer, optionA, optionB, optionC, optionD, optionE } = req.body;
  try {
    const itExists = await Question.findOne({ question });
    if (itExists) return res.json(success("Question already exists", itExists, res.statusCode));
    let newQuestion = new Question({ question, answer, optionA, optionB, optionC, optionD, optionE });
    newQuestion = await newQuestion.save();
    return res.json(success("Success", newQuestion, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const questionList = async (req, res) => {

  try {
    const result = await Question.paginate();
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const questionDetail = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Question.findById({ _id: id });
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateQuestion = async (req, res) => {
  try {
    const result = await Question.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const result = await Question.findByIdAndDelete({ _id: req.query.id });
    return res.json(success("Deleted successfully", result, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}