import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ------------------ HELPER: JWT GENERATION ------------------
// Creates a signed token containing the user ID and role
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );
};

// ------------------ REGISTER CONTROLLER ------------------
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2. Create user (password will be hashed automatically via pre-save hook)
    const user = await User.create({ name, email, password });

    // 3. Generate JWT token
    const token = generateToken(user);

    // 4. Send response with token
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err); // passes error to global error handler
  }
};

// ------------------ LOGIN CONTROLLER ------------------
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT token
    const token = generateToken(user);

    // 4. Send response
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err); // passes error to global error handler
  }
};
