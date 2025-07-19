import express from "express";
import {
  signup,
  verifySignup,
  login,
  verifyLogin,
  refresh,
  getMe,
 
} from "../controllers/authController.js";

import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signup/verify", verifySignup);
router.post("/login", login);
router.post("/login/verify", verifyLogin);
router.get("/refresh-token", refresh);
router.get("/me", authenticate, getMe);

export default router;
