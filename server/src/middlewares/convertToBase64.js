const Buffer = require("buffer").Buffer;

const converToBase64 = async (req, res, next) => {
    let imageBase64 = "";

    if (req.user) {
        let { avatar } = req.user;
        if (avatar) {
            imageBase64 = Buffer.from(avatar, "base64").toString("binary");
            req.user = { ...req.user, avatar: imageBase64 };
        }
    } else if (req.body) {
        let { avatar } = req.body.avatar;
        if (avatar) {
            imageBase64 = Buffer.from(avatar, "base64").toString("binary");
            req.user = { ...req.user, avatar: imageBase64 };
        }
    }
    next();
};
const convertImage = (data) => {
    let imageBase64 = "";
    imageBase64 = Buffer.from(data, "base64").toString("binary");
    return imageBase64;
};
module.exports = {
    converToBase64,
    convertImage,
};
