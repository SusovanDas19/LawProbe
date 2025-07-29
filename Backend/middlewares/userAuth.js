const jwt = require("jsonwebtoken")
const JWT_USER_KEY = process.env.JWT_USER_KEY;

const userAuth = async function(req, res, next) {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(402).json({ message: "Token missing, authorization denied" });
    }
    // Remove 'Bearer '
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    try {
        jwt.verify(token, JWT_USER_KEY, (error, decodedData) => {
            if (error) {
                return res.status(401).json({ message: "Authentication failed" });
            }
            req.userId = decodedData.userId;
            next();
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error during authentication" });
    }
}

module.exports = userAuth;