import { pPollModel } from "../models/pPollModel.js";
export const getParticipantsForVoting = async (req, res) => {
  try {
    const participants = await pPollModel.find();
    res.status(200).send(participants);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const voteParticipant = async (req, res) => {
  try {
    const { pName, pOrganization } = req.body;

    // Find the participant by name
    const participant = await pPollModel.findOne({ pName, pOrganization });

    if (!participant) {
      return res.status(404).send({ error: "Participant not found" });
    }

    // Update the vote count
    participant.pVote = String(Number(participant.pVote) + 1);

    // Save the updated participant
    const newParticipant = await participant.save();

    res
      .status(200)
      .send({ message: "Vote recorded successfully", newParticipant });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getVoteCount = async (req, res) => {
  try {
    const participants = await pPollModel.find();
    let totalVotes = 0;
    participants.forEach((participant) => {
      totalVotes += participant.pVote;
    });
    res.status(200).send(totalVotes);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
