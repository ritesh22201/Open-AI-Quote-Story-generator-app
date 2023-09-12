
const BlacklistModel = require('../models/blacklistModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(token === undefined){
        return res.status(400).send({'msg' : 'Token not found!'});
    }

    const blacklisted = await BlacklistModel.findOne({token});
    if(blacklisted){
        return res.status(400).send({'msg' : 'Token Revoked!'})
    }

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if(decoded){
            req.body.userId = decoded.userId;
            req.body.name = decoded.name;
            next();
        }
        else{
            res.status(400).send({'msg' : 'Invalid token'});
        }
    })
}

module.exports = auth;