import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const decoded = jwt.verify(token, "valami_szupertitkos_kulcs");
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "You have to register/login to add comment" });
    }
};
