import express from "express";
import { getUsers, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", registerUser);

export default router;
