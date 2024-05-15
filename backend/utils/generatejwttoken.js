const jwt = require('jsonwebtoken')


const generateJwtToken = (playLoad,secretKey,exprTime) =>{
    return jwt.sign({playLoad},secretKey,{expiresIn:exprTime})
}

module.exports = generateJwtToken