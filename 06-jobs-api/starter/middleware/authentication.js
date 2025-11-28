const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-api')
const UnauthenticatedError = require('../errors/unauthenticated')

const authenticateToken =  async (req, res, next) => {
    const toSplitToken = req.headers.authorization
    console.log("tosplitToken--", toSplitToken);
    
    if(!toSplitToken || !toSplitToken.startsWith('Bearer ')){
        throw new UnauthenticatedError("authorization header is required and must begin with Bearer ")
    }

        try{
            const token = toSplitToken.split(" ")[1]
            const decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.user= {userId: decodedData.userId, name: decodedData.name}
            next()
        }
        catch(error){
            throw new UnauthenticatedError("incorrect token")
        }
}

module.exports = authenticateToken