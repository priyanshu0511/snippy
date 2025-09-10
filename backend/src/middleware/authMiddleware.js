import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No authentication token found." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log("Error in protect route middleware: ", error);
    return res.status(401).json({ message: "Token invalid or expired." });
  }
};
