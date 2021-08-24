import express from "express";
import { answer, assign_question, emial_notification, getUserQuestions, user_questions } from "./controller";

const router = express.Router();

router.post("/user/question", assign_question);
router.get("/user/questions", user_questions);
router.get("/user/user_question", getUserQuestions);
router.put("/user/solution", answer);
router.post("/user/notification", emial_notification);

export default router;