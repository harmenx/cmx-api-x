require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const dbHost = process.env.DB_HOST;

const { refreshToken } = require('./controllers/AuthController');
const { loginUser } = require('./controllers/AuthController');
const { logoutUser } = require('./controllers/AuthController');

const { postIdea } = require('./controllers/IdeaController');
const { getIdeas } = require('./controllers/IdeaController');
const { deleteIdea } = require('./controllers/IdeaController');
const { updateIdea } = require('./controllers/IdeaController');

const { getProfile } = require('./controllers/UserController');

const { register } = require('./controllers/UserController');
const { authorize } = require('./authMiddleware');

mongoose.Promise = global.Promise;
mongoose.connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.post('/access-tokens/refresh', refreshToken);
app.post('/access-tokens', loginUser);
app.delete('/access-tokens', authorize, logoutUser);

app.get('/me', authorize, getProfile);

app.post('/ideas/', authorize, postIdea);
app.delete('/ideas/:id/', authorize, deleteIdea);
app.get('/ideas/', authorize, getIdeas);
app.put('/ideas/:id/', authorize, updateIdea);

app.post('/users', register);

app.get('*', function(req, res){
    res.status(404).send("No such route");
});
app.put('*', function(req, res){
    res.status(404).send("No such route");
});
app.delete('*', function(req, res){
    res.status(404).send("No such route");
});
const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
