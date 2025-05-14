import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());             // ✅ Cross-origin requests (CORS)
app.use(express.json());     // ✅ Must be before any routes!

export default app;