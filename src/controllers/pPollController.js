import { pPollModel } from "../models/pPollModel.js";
export const getParticipantsForVoting = async (req, res) => {
  try {
    const participants = await pPollModel.find();
    res.json({ participants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const voteParticipant = async (req, res) => {
  try {
    const { pName, pOrganization } = req.body;

    // Find the participant by name
    const participant = await pPollModel.findOne({ pName, pOrganization });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    // Update the vote count
    participant.pVote = String(Number(participant.pVote) + 1);

    // Save the updated participant
    const newParticipant = await participant.save();

    res.json({ message: "Vote recorded successfully", newParticipant });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVoteCount = async (req, res) => {
  try {
    const participants = await pPollModel.find();
    let totalVotes = 0;
    participants.forEach((participant) => {
      totalVotes += participant.pVote;
    });
    res.json({ totalVotes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
