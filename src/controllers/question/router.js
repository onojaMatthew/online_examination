import express from "express";
import { create, deleteQuestion, questionDetail, questionList, updateQuestion } from "./controller";


const router = express.Router();

router.post("/question/new", create);
router.get("/question/all", questionList);
router.get("/question/detail", questionDetail);
router.put("/question/update", updateQuestion);
router.delete("/question/delete", deleteQuestion);

export default router;