import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import { connectDB } from "./src/lib/db.js";
import snippetRouter from "./src/routes/snippetRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/snippet", snippetRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
  connectDB();
});
