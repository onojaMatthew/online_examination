import { UserQuestion } from "../../models/user_question";
import { User } from "../../models/user";
import { Question } from "../../models/question";
import { RandomQuestions } from "../../models/randomQuestions";
import { sendEmail } from "../../services/mailer";
import _ from "underscore";
import { success, error } from "../../config/response";

export const randomizeQuestions = async (req, res) => {
  const { questions, randomCount } = req.body;
  try {
    let count = 0;
    for (let i = 1; i <= randomCount; i++) {
      count++
      let shuffled_questions = await shuffle(questions, randomCount);
      console.log(shuffled_questions)
      let arr = []
      await shuffled_questions.forEach(async (q) => {
        
        arr.push({question: q, user_answer: "" });
        
      });

      let random = new RandomQuestions({ "questions": arr });
        
      random = await random.save();
      if (count === randomCount) return res.json(success("Requestion successfull", [], res.statusCode));
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(error(err.message));
  }
}

export const getRandomQuestions = async (req, res) => {
  try {
    const random = await RandomQuestions.find({}).populate("questions.question");
    return res.json(success("Success", random, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message));
  }
}

export const assign_question = async (req, res) => {
  const { questions, time } = req.body;
  try {
    let count = 0;
    for (let i = 0; i < questions.length; i++){
      let que = questions[i]
      // return
      let userQuestion = new UserQuestion({ questions: que.randomQuestion, time: time, userId: que.user });
      // userQuestion.questions = que.questions
      userQuestion = await userQuestion.save();
      count++;
    };
    if (count === questions.length) {
      return res.json(success("Requestion processed successfully", [], res.statusCode));
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const shuffle = (data, randomCount) => {
  try {
    for (let i = randomCount - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i); // no +1 here!
      let temp = data[i];
      data[i] = data[j];
      data[j] = temp;
    }

    return data;
  
  } catch (error) {
    console.log(error)
  }
}

export const saveQuestion = async (data) => {

}

export const user_questions = async (req, res) => {
  try {
    const questions = await UserQuestion.find({ completed: false });

    return res.json(success("Success", questions, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const getUserQuestions = async (req, res) => {
  const { userId } = req.query;
  try {
    let question = await UserQuestion.findOne({ "userId._id": userId });
    return res.json(success("Success", question, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const answer = async (req, res) => {
  const { user, qxns } = req.body;
  try {
    let question = await UserQuestion.findOne({ "userId._id": user });
    if (!question) return;
    let all_questions = [...question.questions];
    for (let i = 0; i < qxns.length; i++) {
      let questionIndex = question.questions.findIndex(cp => {
        if (cp && cp.question) {
          return cp.question._id.toString() === qxns[i].question.toString();
        }
      });

      if (questionIndex >= 0) {
        all_questions[questionIndex].user_answer = qxns[i].ans;
      }
    }

    const {_id, email } = await User.findById({ _id: user })
    
    question.questions = all_questions;
    question.userId = { _id, email };
    question.completed = true

    question = await question.save();
    // console.log(all_questions);

    return res.json(success("Success", question, res.statusCode));
    
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  } 
}

export const emial_notification = async (req, res) => {
  const { emails } = req.body;
  try {
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      const isUser = await User.findOne({ email: email });
      if (isUser) {
        const user_name = email.split("@")[0];
        isUser.domain_name = user_name;
        await isUser.save();
        const link = `http://localhost:3000/${user_name}/test`;
        const receiver = email;
        const sender = "onoja.matthew@ojirehprime.com";
        const subject = "Online Assessment";
        const message = `<h3>Hello dear,</h3> \n 
        <p>Congratulations!! Following your submission for our job opening, we have 
        reviewed your resume and willing to proceed with you to the next phase. We have prepared an online test 
        for us to test. Please use the link ${link} to access the test. The test is time based and we encourage you 
        to finish before the end of the time.</p>
        
        <p>Good Luck!!!.</p>
        <p>The Company xyz Team.</p>`;

        const data = {
          receiver,
          sender,
          subject,
          message
        }

        await sendEmail(data);
      }
    }
    return res.json(success("Notification Sent!", {}, res.statusCode))
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

