import pool from "../config/db.js";

export const addComment = async (req, res) => {
    const { comment, movie_id } = req.body;

    try {
        await pool.query(
            "INSERT INTO comments (comment, date, movie_id, user_id) VALUES (?, CURDATE(), ?, ?)",
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
            `SELECT c.comment, c.date, u.username
             FROM comments c
             JOIN users u ON u.user_id = c.user_id
             WHERE c.movie_id = ?
             ORDER BY c.date DESC`,
            [movie_id]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};
