import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

const PORT = 5500;
app.listen(PORT, () => console.log("Server running on port " + `https://localhost:${PORT}`  ));
