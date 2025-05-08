import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());             // ✅ Cross-origin requests (CORS)
app.use(express.json());     // ✅ Must be before any routes!

// ✅ Register routes AFTER body parser
app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("DevCollab API is running 🚀");
// });

export default app;