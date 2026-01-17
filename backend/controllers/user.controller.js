import uploadToCloudinary from "../config/cloudnary.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const id = req.id;
    console.log("User ID from token:", req.id);
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const name = req.body.name;
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    const user = await User.findByIdAndUpdate(req.id, {
      name,
      image,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Profile error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.id },
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
