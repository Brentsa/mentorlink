require('dotenv').config()
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');

//expiration is 10 mins
const expiration = 60 * 10;

function signJWT(member){
    //Destructure _id, firstName and username from the given member
    const {_id, firstName, username} = member;
    const payload = {_id, firstName, username};

    //return the signed jwt token
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiration});
}

function authMiddleware({req}){
    //assign the token from the request header
    let token = req.headers.authorization;

    //if there is no token throw an auth error
    if(!token) throw new AuthenticationError("You must be logged in.");

    //since the token is valid at this point, remove the bearer string
    token = token.split(' ')[1];

    try{
        //try to verify the token in the header if it is available and return the member info
        const memberInfo = jwt.verify(token, process.env.JWT_SECRET, {expiresIn: expiration});
        req.member = memberInfo
    }
    catch{
        //note the invalid credentials on the middleware and return the request as normal
        console.log('invalid credentials');
    }

    return req
}

module.exports = {signJWT, authMiddleware};