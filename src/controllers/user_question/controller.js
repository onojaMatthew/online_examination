import { UserQuestion } from "../../models/user_question";
import { User } from "../../models/user";
// import { Question } from "../../models/question";
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
      console.log(count, randomCount)
      if (Number(count) === Number(randomCount)) return res.json(success("Requestion successfull", [], res.statusCode));
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
    if (questions.length <= 0) return res.status(400).json(error("No candidates selected for this test", res.statusCode));
    for (let i = 0; i < questions.length; i++){
      let que = questions[i]
      if (!que.randomQuestion || !que.user) return res.status(400).json(error("Invalid users or questions", res.statusCode)); 
      // return
      let randomQue = await RandomQuestions.findById({ _id: que.randomQuestion}).populate("questions.question");
      let arr = [];
      await randomQue && randomQue.questions.forEach(q => {
        const questionObj = {
          question: q && q.question && q.question.question,
          answer: q && q.question && q.question.answer,
          optionA: q && q.question && q.question.optionA,
          optionB: q && q.question && q.question.optionB,
          optionC: q && q.question && q.question.optionC,
          optionD: q && q.question && q.question.optionD,
          optionE: q && q.question && q.question.optionE,
          user_answer: "",
        }
        arr.push(questionObj);
      });

      let userQuestion = new UserQuestion({ questions: arr, time: time, userId: que.user });
      userQuestion = await userQuestion.save();

      emial_notification(que);
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

export const get_assigned_question = async (req, res) => {
  try {
    const userQuestion = await UserQuestion.findOne({ userId: req.query.id, completed: false }).populate("userId")
    
    return res.json(success("Success", userQuestion, res.statusCode));
  } catch (err) {
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
    let question = await UserQuestion.findOne({ userId: user, completed: false });
    if (!question) return;
    let all_questions = [...question.questions];
    for (let i = 0; i < qxns.length; i++) {
      const eachQuestion = qxns[i]
      let questionIndex = question.questions.findIndex(cp => {
        if (cp && cp.question) {
          return cp._id.toString() === eachQuestion.question.toString();
        }
      });
      if (questionIndex >= 0) {
        all_questions[questionIndex].user_answer = eachQuestion && eachQuestion.ans;
      }
    }
  
    const {_id } = await User.findById({ _id: user });
    
    question.questions = all_questions;
    question.userId = _id;
    question.completed = true

    question = await question.save();

    return res.json(success("Success", question, res.statusCode));
    
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  } 
}

export const getUserSolution = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await UserQuestion.findOne({ userId: id, completed: true }).populate("userId");
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const emial_notification = async (data) => {
  
  try {
    let isUser = await User.findById({ _id: data.user });
    if (isUser) {
      const user_name = isUser && isUser.email.split("@")[0];
      isUser.domain_name = user_name;
      isUser = await isUser.save();
      const link = `http://localhost:3000/test/${isUser && isUser.domain_name}`;
      const receiver = isUser.email;
      const sender = "onoja.matthew@ojirehprime.com";
      const subject = "Online Assessment";
      const message = `<h3>Hello dear,</h3> \n 
      <p>Congratulations!! Following your submission for our job opening, we have 
      reviewed your resume and willing to proceed with you to the next phase. We have prepared an online test 
      for you to tested. Please use the link ${link} to access the test. The test is time based and we encourage you 
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
  } catch (err) {
    console.log(err.message)
  }
}

