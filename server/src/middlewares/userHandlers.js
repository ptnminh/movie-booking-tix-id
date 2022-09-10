const {User} = require('../models');

const isExistEmail = async (req,res,next) => {
    const {email} = req.body;
    try {
        const user = await User.findAll({
            where:{
                email
            }
            ,
            raw:true
        })
        if(user?.length === 0) {
            next();
        } else {
            res.status(400).send({
                "statusCode":400,
                "message":"Existed email."
            })
        }
    } catch(e) {
        res.status(500).send({
            "statusCode":500,
            "message":"Something went wrong."
        })
    }
}
const isEmpty = async (req,res,next) => {
    const {email,password} = req.body;
    try {
        if(email === '' || password === '') {
            res.status(404).send({
                "statusCode":404,
                "message":"Don't let the empty field."
            })
        }
        else {
            next();
        }
    } catch(e) {
        res.status(500).send({
            "statusCode":500,
            "message":"Something went wrong."
        })
    }
}
const isValidPhone = async (req,res,next) => {
    const {phone} = req.body;
    const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(!re.test(phone)) {
        res.status(401).send({
            statusCode:401,
            message:"Invalid phone number.",
        })
    } else {
        next();
    }
}

module.exports = {
    isExistEmail,
    isEmpty,
    isValidPhone
}