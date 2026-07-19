import express from "express";

import { verifyJwt } from "../middlewares/auth.middlewares.js";
import apiResponse from "../utils/ai.services.js";

const router = express.Router();

router.post("/get-review",verifyJwt, apiResponse);


export default router;