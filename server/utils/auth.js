require('dotenv').config()
const jwt = require('jsonwebtoken');

//expiration is 10 mins
const expiration = 60 * 10;

function signJWT(member){
    //Destructure firstName and username from the given member
    const {firstName, username} = member;
    const payload = {firstName, username};

    //return the signed jwt token
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiration});
}

function authMiddleware(req, res){

}

module.exports = {signJWT, authMiddleware};