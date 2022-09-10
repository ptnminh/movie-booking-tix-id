const express = require('express');
const { createFilmController, deteteFilmController, getFilmController, updateFilmController, getTypeFilmsController } = require('../controllers/filmController');


const filmRouter = express.Router();

filmRouter.post('/createFilm',createFilmController)
filmRouter.delete('/deleteFilm',deteteFilmController);
filmRouter.get('/getFilm',getFilmController);
filmRouter.put('/updateFilm',updateFilmController)
filmRouter.get('/getListFilm',getTypeFilmsController,)
module.exports = filmRouter;