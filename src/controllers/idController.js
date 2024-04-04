import { userIdModel } from "../models/idModel.js";
export const createIdController = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await userIdModel.findOne({ userId });

    if (existingUser) {
      return res.status(400).send({ message: "User ID already exists" });
    }

    const newUser = new userIdModel({ userId });

    const response = await newUser.save();

    res.status(201).send({
      message: "User registered successfully",
      response: response,
      newUser: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateIdController = async (req, res) => {
  const { userId } = req.params;
  const { newUserId } = req.body;

  try {
    const existingUser = await userIdModel.findOne({ userId: newUserId });
    if (existingUser) {
      return res.status(400).send({ message: "New userId is already taken" });
    }

    const updatedUser = await userIdModel.findOneAndUpdate(
      { userId: userId },
      { $set: { userId: newUserId } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res
      .status(200)
      .send({ message: "UserId update successfully", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteIdController = async (req, res) => {
  try {
    const userIdToDelete = req.params.userId;
    const deletedUser = await userIdModel.findOneAndDelete({
      userId: userIdToDelete,
    });

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res
      .status(200)
      .send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
