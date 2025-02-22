const jwt = require("jsonwebtoken");

// Middleware to check role-based access
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.header("Authorization");
        if (!token) return res.status(403).json({ message: "Access Denied" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Unauthorized Access" });
            }

            next();
        } catch (err) {
            res.status(400).json({ message: "Invalid Token" });
        }
    };
};
