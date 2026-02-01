import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
// Checks for a valid JWT token in the Authorization header
export const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Attach user to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // proceed to the protected route
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
