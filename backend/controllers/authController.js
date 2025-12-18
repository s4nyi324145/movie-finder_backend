import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    const { username, email, psw } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

    try {
        const hashed = await bcrypt.hash(psw, 10);

        
        await pool.query(
            "INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)",
            [email, hashed, username]
        );

        res.json({ message: "User registered" });
    } catch (err) {
        console.log(err)
     
        if (err.code === "ER_DUP_ENTRY") {
            if(err.sqlMessage.includes("unique_username")){
                return res.status(400).json({message: "Username already taken"})
            }
            if(err.sqlMessage.includes("users_email_unique")){
                return res.status(400).json({message: "Email already registered"})
            }
        }
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    const { email, psw } = req.body;


 

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Email not found" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(psw, user.password_hash);

        if (!match) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            "valami_szupertitkos_kulcs",
            { expiresIn: "7d" }
        );

        res.json({ token, username: user.username, user_id: user.user_id });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



