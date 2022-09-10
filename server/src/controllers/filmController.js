const { convertImage } = require("../middlewares/convertToBase64");
const { createFilmService, deleteFilmService, getFilmsService, updateFilmService, getListTypefilmsService } = require("../services/filmServices")




const createFilmController = async (req,res) => {
    
    try {
        const newFilm = await createFilmService(req.body)
        res.status(200).send({
            statusCode: 200,
            data:newFilm
        });
    } catch(e) {
        console.log(e)
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }

}
const deteteFilmController = async (req,res) => {
    const {id} = req.query;
    try {
        await deleteFilmService(id);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully."
        })
    } catch(e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
}
const getFilmController = async (req,res) => {
    const {id} = req.query;
    try {
        const film = await getFilmsService(+id);
        res.status(200).send({
            statusCode: 200,
            data:film
        });
    } catch(e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
}
const updateFilmController = async (req,res) => {
    try {
        const film = await updateFilmService(req.body);
        res.status(200).send({
            statusCode: 200,
            data:film
        });
    } catch(e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
}
const getTypeFilmsController = async (req,res) => {
    const {limit,type} = req.query;
    try {
        let films = await getListTypefilmsService(+limit,type);
        
        for(let i = 0;i < Object.keys(films).length;i++) {
            
            if(films[i].poster_film) {
                films[i].poster_film = convertImage(films[i].poster_film);
            }
        }
        res.status(200).send({
            statusCode: 200,
            data:films
        });
    } catch(e) {
        res.status(400).send({
            statusCode: 400,
            "message:": e,
        });
    }
}
module.exports = {
    createFilmController,
    deteteFilmController,
    getFilmController,
    updateFilmController,
    getTypeFilmsController,
}