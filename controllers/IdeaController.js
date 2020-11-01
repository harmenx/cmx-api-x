const ideaDao = require('../database/idea.dao');

const postIdea = async (req, res) => {
  req.body.creator = req.decoded.userEmail;
  req.body.average_score = (req.body.impact + req.body.ease + req.body.confidence) / 3.0;
  req.body.created_at = Date.now();
  let idea = await ideaDao.createIdea(req.body);
  if (idea) {
    let finalIdea = {
      id: idea._id,
      ...idea._doc,
      _id: undefined,
      __v : undefined,
      creator :undefined,
    }
    res.status(200).send(finalIdea);
  } else {
    res.status(500).send('Error creating the idea');
  }
};

const deleteIdea = async (req, res) => {
  if (!req.params.id) {
    res.status(404).send();
  } else {
    const { id } = req.params;
    const idea = await ideaDao.getIdea(id);
    if (idea) {
      if (idea.creator === req.decoded.userEmail) {
        await ideaDao.deleteIdea(id);
        res.status(204).send();
      } else {
        res.status(401).send();
      }
    } else {
      res.status(404).send('Idea not found');
    }
  }
};

const getIdeas = async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const pageOffset = (page * pageSize) - pageSize;
  const ideas = await ideaDao.getIdeas(req.decoded.userEmail, pageOffset, pageSize);
  if(ideas){
    let finalIdeas = ideas.map(function(idea) {
      console.log(idea);
      return  {
        id: idea._id,
        ...idea._doc,
        _id: undefined,
        __v : undefined,
        creator :undefined,
      }
    });
    res.status(200).send(finalIdeas);
  }else{
    res.status(404).send();
  }
};

const updateIdea = async (req, res) => {
  if (!req.params.id) {
    res.status(404).send();
  } else {
    const { id } = req.params;
    const idea = await ideaDao.getIdea(id);
    console.log(idea);
    if (idea) {
      if (idea.creator === req.decoded.userEmail) {
        req.body.average_score = (req.body.impact + req.body.ease + req.body.confidence) / 3.0;
        const updatedIdea = await ideaDao.updateIdea(req.params.id, req.body);
        let finalIdea = {
          id: updatedIdea._id,
          ...updatedIdea._doc,
          _id: undefined,
          __v : undefined,
          creator :undefined,
        }
        res.status(200).send(finalIdea);
      }else{
        res.status(401).send();
      }
    }else {
      res.status(404).send('Idea not found');
    }
  }
};

module.exports = {
  postIdea,
  getIdeas,
  deleteIdea,
  updateIdea,
};
