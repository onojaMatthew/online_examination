import express from "express";
import { answer, assign_question, emial_notification, getRandomQuestions, getUserQuestions, getUserSolution, get_assigned_question, randomizeQuestions, user_questions } from "./controller";

const router = express.Router();

router.post("/user/question", assign_question);
router.get("/user/questions", user_questions);
router.get("/user/user_question", getUserQuestions);
router.get("/user/assigned_questions", get_assigned_question);
router.put("/user/solution", answer);
router.get("/user/user_solution", getUserSolution);
router.get("/user/random", getRandomQuestions);
router.post("/user/notification", emial_notification);
router.post("/user/question/randomize", randomizeQuestions);

export default router;