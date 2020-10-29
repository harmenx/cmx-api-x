const mongoose = require('mongoose');

const Idea = mongoose.model('Idea', new mongoose.Schema({
  content: { type: String, required: true },
  impact: { type: Number, required: true },
  ease: { type: Number, required: true },
  confidence: { type: Number, required: true },
  creator: { type: String, required: true },
}));

const getIdeas = async (email, pageIndex, pageSize) => {
  try {
    const ideas = await Idea.find({ creator: email }).sort({ createdAt: 1 })
      .skip(pageIndex).limit(pageSize);
      
    return ideas;
  } catch (e) {
    return undefined;
  }
};

const createIdea = async (body) => {
  try {
    const idea = await Idea.create(body);
    return idea;
  } catch (e) {
    return undefined;
  }
};

const updateIdea = async (id, body) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate({ _id: id }, body);
    return updatedIdea;
  } catch (e) {
    return undefined;
  }
};

const deleteIdea = async (id) => {
  try {
    await Idea.findOneAndDelete({ _id: id });
    return true;
  } catch (e) {
    return undefined;
  }
};

module.exports = {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
};
