const express = require('express');
const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const UserRepositoryController = require('./controllers/UserRepositoryController');
const RepositoryController = require('./controllers/RepositoryController');
const SessionController = require('./controllers/SessionController');
const LikeController = require('./controllers/LikeController');

//para testes
//routes.get('/users', UserController.index);
//routes.get('/likes', LikeController.index);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/userRepositories', UserRepositoryController.index);

routes.get('/repositories', RepositoryController.index);

routes.post('/repositories', RepositoryController.store);

routes.put('/repositories/:id', RepositoryController.update);

routes.delete('/repositories/:id', RepositoryController.delete);

routes.post('/repositories/:id/like', LikeController.store);

routes.delete('/repositories/:id/like', LikeController.delete);

module.exports = routes;
