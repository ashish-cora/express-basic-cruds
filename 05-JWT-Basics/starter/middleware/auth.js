const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const { BadRequestError } = require('../errors')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        throw new UnauthenticatedError("Valid authorization token is required")
    }
    
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username } = decoded
        req.user = {id, username}
        next();
    }

    catch(err){
        throw new BadRequestError( 'incorrect auth token');
    }

 }

 module.exports = authMiddleware