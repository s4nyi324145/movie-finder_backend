import pool from "../config/db.js";

export const addComment = async (req, res) => {
    const { comment, movie_id } = req.body;

    try {
        await pool.query(
            "INSERT INTO comments (comment, created_at, movie_id, user_id) VALUES (?, CURRENT_TIMESTAMP(), ?, ?)",
            [comment, movie_id, req.user.user_id]
        );

        res.json({ message: "Comment added" });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getComments = async (req, res) => {
    const { movie_id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT *
             FROM comments c
             JOIN users u ON u.user_id = c.user_id
             WHERE c.movie_id = ?
             ORDER BY c.created_at DESC `,
            [movie_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUserComments = async (req, res) => {
    const {user_id} = req.params;
  
    try {
      const [comments] = await pool.query(
        "SELECT * FROM comments WHERE comments.user_id = ? ORDER BY comments.date DESC",
        [user_id]
      );
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

export const editComment = async(req,res) =>{
    const {comment_id} = req.params
    const {comment} = req.body

    try {
        const result = await pool.query("UPDATE `comments` SET `comment`= ? WHERE comment_id = ?", [comment,comment_id])
        res.status(201).json({message: "Comment edited"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

export const deleteComment = async(req,res) =>{
    const {comment_id} = req.params


    try {
        const result = await pool.query("DELETE FROM `comments` WHERE comment_id = ?", [comment_id])
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({message: "Comment deleted"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

