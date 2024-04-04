import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};
