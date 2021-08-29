import express from "express";
import { answer, assign_question, emial_notification, getRandomQuestions, getUserQuestions, randomizeQuestions, user_questions } from "./controller";

const router = express.Router();

router.post("/user/question", assign_question);
router.get("/user/questions", user_questions);
router.get("/user/user_question", getUserQuestions);
router.put("/user/solution", answer);
router.get("/user/random", getRandomQuestions);
router.post("/user/notification", emial_notification);
router.post("/user/question/randomize", randomizeQuestions);

export default router;