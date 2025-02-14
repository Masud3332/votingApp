import { userIdModel } from "../models/idModel.js";
import { voterModel } from "../models/voterModel.js";

export const createVoterController = async (req, res) => {
  try {
    const { voterId, voterName, DateOfBirth, email, password } = req.body;
    const existingUser = await userIdModel.findOne({ userId: voterId });
    if (!existingUser) {
      return res
        .status(400)
        .send({ error: "User with this voter ID already exists." });
    }
    if (!voterId || !voterName || !DateOfBirth || !email || !password) {
      return res.status(400).send({ error: "All fields are required." });
    }
    const newUser = new voterModel({
      voterId,
      voterName,
      DateOfBirth,
      email: email.toLowerCase(),
      password,
    });
    await newUser.save();

    return res
      .status(201)
      .send({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginVoterController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await voterModel.findOne({ email, password });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    return res.status(200).send({
      message: "Login successful",
      user: { voterId: user.voterId, voterName: user.voterName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateVoterController = async (req, res) => {
  const voterId = req.params.id;

  try {
    const updatedVoter = await voterModel.findOneAndUpdate(
      { voterId },
      req.body,
      { new: true }
    );

    if (!updatedVoter) {
      return res.status(404).send({ message: "Voter not found" });
    }

    res.status(200).send(updatedVoter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteVoterController = async (req, res) => {
  const { voterId } = req.params;

  try {
    const deletedVoter = await voterModel.findOneAndDelete({ voterId });

    if (deletedVoter) {
      res
        .status(200)
        .send({ success: true, message: "Voter deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Voter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
