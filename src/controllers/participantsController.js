import { participantsModel } from "../models/participantsModel.js";

export const participantCreate = async (req, res) => {
  const { pId, pName, pPassword, pOrganization } = req.body;
  try {
    const participant = await participantsModel.findOne({ pId });

    if (participant) {
      throw { code: 404, message: " Participants already exist" };
    }
    const newParticipant = new participantsModel(
      {
        pId,
        pName,
        pPassword,
        pOrganization,
      },

      console.log(req.body)
    );
    console.log("newParticipants", newParticipant);
    await newParticipant.save();
    res
      .status(201)
      .json({ message: "participant create successfully", newParticipant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" || error.message });
  }
};

export const Participantslogin = async (req, res) => {
  const { pId, pPassword } = req.body;

  try {
    const participant = await participantsModel.findOne({ pId });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    if (participant.pPassword !== pPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    return res.status(200).json({ message: "Login successful", participant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ParticipantsUpdate = async (req, res) => {
  const participantId = req.params.id;
  const updateData = req.body;

  try {
    const updatedParticipant = await participantsModel.findByIdAndUpdate(
      participantId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    return res.status(200).json({
      message: "Participant updated successfully",
      data: updatedParticipant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const ParticipantsDelete = async (req, res) => {
  try {
    const participantId = req.params.id;

    const existingParticipant = await participantsModel.findById(participantId);
    if (!existingParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    await participantsModel.findByIdAndDelete(participantId);

    return res.status(200).json({
      message: "Participant deleted successfully",
      existingParticipant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
