const ideaDao = require('../database/idea.dao');

const postIdea = async (req, res) => {
  req.body.creator = req.decoded.userEmail;
  req.body.average = (req.body.impact + req.body.ease +  req.body.confidence ) / 3.
  const idea = await ideaDao.createIdea(req.body);
  idea.__v = undefined;
  idea.creator = undefined;
  idea._id = undefined;
  res.status(200).send(idea);
};

const deleteIdea = async (req, res) => {
  const { id } = req.params;
  await ideaDao.deleteIdea(id);
  res.status(204).send();
};

const getIdeas = async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const pageOffset = (page * pageSize) - pageSize;
  const ideas = await ideaDao.getIdeas(req.decoded.userEmail, pageOffset, pageSize);
  res.status(200).send(ideas);
};

const updateIdea = async (req, res) => {
  req.body.average = (req.body.impact + req.body.ease +  req.body.confidence ) / 3.
  const updatedIdea = await ideaDao.updateIdea(req.params.id, req.body);
  updatedIdea.__v = undefined;
  updatedIdea.creator = undefined;
  updatedIdea._id = undefined;
  res.status(200).send(updatedIdea);
};

module.exports = {
  postIdea,
  getIdeas,
  deleteIdea,
  updateIdea,
};
