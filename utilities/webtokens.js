require('dotenv').config()
const jwt = require("jsonwebtoken")

function getWebToken(object){
    return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET)
}

function authenticateToken(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, object) => {
        if(err) return null
        return object
    })
}

module.exports = {
    getWebToken,
    authenticateToken
}