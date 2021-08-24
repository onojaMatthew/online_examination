import { UserQuestion } from "../../models/user_question";
import { User } from "../../models/user";
import { Question } from "../../models/question";
import { sendEmail } from "../../services/mailer";
import _ from "underscore";
import { success, error } from "../../config/response";

export const assign_question = async (req, res) => {
  const { questions, user, time } = req.body;
  try {
    let newUserquestion;
    const question_arr = _.shuffle(questions);
    // let questnObj = {};
    let question = [];
    
    for (let i = 0; i < question_arr.length; i++) {
      let que = question_arr[i];
      const questn = await Question.findById({ _id: que });
      
      const dataObj = {
        question: {
          _id: questn._id,
          question: questn && questn.question,
          answer: questn && questn.answer,
          optionA: questn && questn.optionA,
          optionB: questn && questn.optionB,
          optionC: questn && questn.optionC,
          optionD: questn && questn.optionD,
          optionE: questn && questn.optionE,
        },
        user_answer: ""
      }
      
      question.push(dataObj);
    }
    
    const currentUser = await User.findById({ _id: user });
    newUserquestion = new UserQuestion({ questions: question && question, time });
    newUserquestion.userId = {
      _id: currentUser && currentUser._id,
      email: currentUser && currentUser.email,
    }
    newUserquestion = await newUserquestion.save();
  
    return res.json(success("Success", newUserquestion, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const user_questions = async (req, res) => {
  try {
    const questions = await UserQuestion.find();

    return res.json(success("Success", questions, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const getUserQuestions = async (req, res) => {
  const { userId } = req.query;
  console.log(userId, " the user id")
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

    question = await question.save()
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

