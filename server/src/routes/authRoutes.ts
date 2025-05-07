import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

// Placeholder route
router.get("/", (req, res) => {
  res.send("Auth route is working ✅");
});

router.post("/register", register);
router.post("/login", login);

export default router;