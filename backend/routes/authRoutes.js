import express from "express";
import {
  signup,
  verifySignup,
  login,
  verifyLogin,
  refresh,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signup/verify", verifySignup);
router.post("/login", login);
router.post("/login/verify", verifyLogin);
router.get("/refresh-token", refresh);

export default router;
