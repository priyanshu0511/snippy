import Snippet from "../model/Snippet.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, code, language } = req.body;

    if (!title || !code || !language) {
      return res.status(401).json({ message: "All fields are required." });
    }

    const user = req.user._id;
    console.log(user);

    const newSnippet = new Snippet({ title, code, language, user });
    await newSnippet.save();

    return res.status(201).json({ message: "Snippet saved successfully!" });
  } catch (error) {
    console.log("Error in createSnippet controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSnippets = async (req, res) => {
  try {
    const user = req.user._id;
    const snippets = await Snippet.find({ user });
    return res.status(200).json(snippets);
  } catch (error) {
    console.log("Error in getAllSnippets controller: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid snippet ID" });
    }

    const singleSnippet = await Snippet.findById(id);
    if (!singleSnippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    res.status(200).json(singleSnippet);
  } catch (error) {
    console.log("Error in getSingleSnippet controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
