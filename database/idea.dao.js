const mongoose = require('mongoose');

const Idea = mongoose.model('Idea', new mongoose.Schema({
    content: { type: String, required: true },
    impact: { type: String, required: true },
    ease: { type: String, required: true },
    confidence: { type: String, required: true },
    creator: { type: String, required: true }
}));

getIdeas = async (email, pageIndex, pageSize) => {
    let ideas = await Idea.find({creator:email}).sort({createdAt: 1}).skip(pageIndex).limit(pageSize);
    return ideas
}

createIdea = async (body) => {
    let idea = await Idea.create(body);
    return idea;
}

updateIdea = async (id, body) => {
    let updatedIdea = await Idea.findByIdAndUpdate({'_id': id}, body);
    return updatedIdea;
}

deleteIdea = async (id) => {
   await  Idea.findOneAndDelete({'_id':id});
   return true;
}

module.exports = {
    getIdeas,
    createIdea,
    updateIdea,
    deleteIdea
}