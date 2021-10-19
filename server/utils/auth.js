require('dotenv').config()
const jwt = require('jsonwebtoken');

//expiration is 10 mins
const expiration = '2h';

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

    // //since the token is valid at this point, remove the bearer string
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
        token = token.split(' ')[1];
    }

    if (!token) return req;

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