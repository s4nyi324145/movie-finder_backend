import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import watchlistRoutes from "./routes/watchlist.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/watchlist", watchlistRoutes)

const PORT = 5500;
app.listen(PORT, () => console.log("Server running on port " + `http://localhost:${PORT}`  ));
