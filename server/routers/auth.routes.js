import express from "express";
import { getUserHistory, loginUser, logoutController, profileController, registerUser } from "../controllers/auth.controllers.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutController);
router.get("/profile", verifyJwt, profileController);
router.get("/history", verifyJwt, getUserHistory);


export default router;