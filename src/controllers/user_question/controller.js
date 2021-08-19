// import { UserQuestion } from "../../models/user_question";
import { User } from "../../models/user";
import { Question } from "../../models/question";
import _ from "underscore";
import { success, error } from "../../config/response";

export const assign_question = async (req, res) => {
  const { questions, users } = req.body;
  try {
    let question_arr;
    users.forEach((user) => {
      question_arr = _.shuffle(questions);
      for (let i = 0; i < question_arr.length; i++) {
        const question = question_arr[i];
        const qtn = await Question.findById({ _id: question });
        let updatedUser = await User.findById({ _id: user });
        updatedUser.questions.question = {
          _id: qtn._id,
          question: qtn.question,
          answer: qtn.answer,
          optionA: qtn.optionA,
          optionB: qtn.optionB,
          optionC: qtn.optionC,
          optionD: qtn.optionD,
          optionE: qtn.optionE,
        }
        updatedUser = await updatedUser.save();
        return res.json(success("Success", updatedUser, res.statusCode));
      }
    });
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}


// _id: room._id,
// name: room.name,
// amount: room.amount,
// discount: room.discount,
// number:room.number


