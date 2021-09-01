import express from "express";
import { createAdmin, dashboardData, fetchAdmin, logout, signIn } from "./admin";


const router = express.Router();

router.post("/admin/post", createAdmin);
router.post("/admin/login", signIn);
router.get("/admin/list", fetchAdmin);
router.get("/admin/logout", logout)
router.get("/admin/dashboard", dashboardData);

export default router;