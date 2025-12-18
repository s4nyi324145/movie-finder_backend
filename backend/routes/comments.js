import express from "express";
import { addComment, deleteComment, editComment, getComments, getUserComments } from "../controllers/commentsController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authRequired, addComment);
router.get("/:movie_id", getComments);
router.get("/users/:user_id", authRequired, getUserComments)
router.put("/:comment_id", authRequired, editComment)
router.delete("/:comment_id", authRequired, deleteComment)


export default router;
