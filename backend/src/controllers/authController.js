import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exits" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: newPassword });
    await newUser.save();

    return res.status(201).json({ message: "User saved successfully!" });
  } catch (error) {
    console.log("error in signup controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or Password is incorrect." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Username or Password is incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login Successfull",
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.log("Error in login controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {};
