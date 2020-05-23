require('dotenv').config()
const jwt = require("jsonwebtoken")

function getWebToken(object){
    return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET)
}

function authenticateToken(token, callback) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, object) => {
        callback(err, object)
    })
}

module.exports = {
    getWebToken,
    authenticateToken
}