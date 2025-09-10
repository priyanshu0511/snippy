import Snippet from "../model/Snippet.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, code, language } = req.body;

    if (!title || !code || !language) {
      return res.status(401).json({ message: "All fields are required." });
    }

    const user = req.user._id;

    const newSnippet = new Snippet({ title, code, language, user });
    await newSnippet.save();

    return res.status(201).json({ message: "Snippet saved successfully!" });
  } catch (error) {
    console.log("Error in createSnippet controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
