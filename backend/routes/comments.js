import express from "express";
import { addComment, getComments } from "../controllers/commentsController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authRequired, addComment);
router.get("/:movie_id", getComments);

export default router;
