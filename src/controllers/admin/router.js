import express from "express";
import { createAdmin, fetchAdmin, signIn } from "./admin";


const router = express.Router();

router.post("/admin/post", createAdmin);
router.post("/admin/login", signIn);
router.get("/admin/list", fetchAdmin);

export default router;