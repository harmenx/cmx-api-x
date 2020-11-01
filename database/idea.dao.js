const mongoose = require('mongoose');

const Idea = mongoose.model('Idea', new mongoose.Schema({
  content: { type: String, required: true },
  impact: { type: Number, required: true },
  ease: { type: Number, required: true },
  confidence: { type: Number, required: true },
  creator: { type: String, required: true },
  average_score: { type: Number, required: true },
  created_at: { type: Number, required: Number },
}));

const getIdea = async (id) => {
  try {
    const idea = await Idea.findById(id);
    return idea;
  } catch (e) {
    return undefined;
  }
};

const getIdeas = async (email, pageIndex, pageSize) => {
  try {
    const ideas = await Idea.find({ creator: email }).sort({ average_score: -1 })
      .skip(pageIndex).limit(pageSize);
    return ideas;
  } catch (e) {
    return undefined;
  }
};

const createIdea = async (body) => {
  try {
    return await Idea.create(body);
  } catch (e) {
    return undefined;
  }
};

const updateIdea = async (id, body) => {
  try {
    return await Idea.findByIdAndUpdate({ _id: id }, body);
  } catch (e) {
    return undefined;
  }
};

const deleteIdea = async (id) => {
  try {
    return await Idea.findOneAndDelete({ _id: id });
  } catch (e) {
    return undefined;
  }
};

module.exports = {
  getIdea,
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
};
