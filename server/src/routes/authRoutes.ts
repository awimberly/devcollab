import { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

// Placeholder route
router.get("/", (req: Request, res: Response) => {
  res.send("Auth route is working ✅");
});

router.post("/register", register as (req: Request, res: Response) => void);
router.post("/login", login as (req: Request, res: Response) => void);

export default router;