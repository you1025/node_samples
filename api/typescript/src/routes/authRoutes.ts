import { Router } from "express";
import { signUp, signIn, refreshToken } from "../utils/auth.js"

const router = Router();

router.post("/signup",  signUp);
router.post("/signin",  signIn);
router.post("/refresh", refreshToken);

export default router;