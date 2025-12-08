import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, psw, username } = req.body;

    try {
        const hashed = await bcrypt.hash(psw, 10);

        await pool.query(
            "INSERT INTO users (email, psw, username) VALUES (?, ?, ?)",
            [email, hashed, username]
        );

        res.json({ message: "User registered" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already registered" });
        }
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    const { email, psw } = req.body;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0)
            return res.status(400).json({ message: "Invalid email or password" });

        const user = rows[0];

        const match = await bcrypt.compare(psw, user.psw);
        if (!match)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, username: user.username, user_id: user.user_id });
    } catch (err) {
        res.status(500).json(err);
    }
};

