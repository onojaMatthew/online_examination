import express from "express";
import { createUser, deleteUser, login, updateUser, userDetail, users } from "./controller";

const router = express.Router();

router.post("/user/new", createUser);
router.post("/user/login", login);
router.get("/user/all", users);
router.get("/user/detail", userDetail);
router.put("/user/update", updateUser);
router.delete("/user/delete", deleteUser);

export default router;