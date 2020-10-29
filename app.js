require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbHost = process.env.DB_HOST;


const refreshToken  = require('./controllers/AuthController').refreshToken;
const loginUser = require('./controllers/AuthController').loginUser;
const logoutUser =  require('./controllers/AuthController').logoutUser;

const postIdea = require('./controllers/IdeaController').postIdea;
const getIdeas =  require('./controllers/IdeaController').getIdeas;
const deleteIdea = require('./controllers/IdeaController').deleteIdea;
const updateIdea =  require('./controllers/IdeaController').updateIdea;

const getProfile = require('./controllers/UserController').getProfile;

const register =  require('./controllers/UserController').register;
const authorize = require('./authMiddleware').authorize;

mongoose.Promise = global.Promise;
mongoose.connect(dbHost, { useNewUrlParser: true , useUnifiedTopology: true});


app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// user
app.post('/access-tokens/refresh', refreshToken);
app.post('/access-tokens', loginUser);
app.delete('/access-tokens', authorize, logoutUser);

app.get('/me', authorize, getProfile);

app.post('/ideas',authorize, postIdea);
app.delete('/ideas/:id',authorize, deleteIdea);
app.get('/ideas/',authorize, getIdeas);
app.put('/ideas/:id',authorize, updateIdea);

app.post('/users', register);


const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;