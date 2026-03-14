import express, { type Application } from "express";
import authRoutes from "./routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "Express running on Bun! 🚀",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);

export default app;
