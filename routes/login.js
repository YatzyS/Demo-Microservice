require('dotenv').config()

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

const jwt = require("jsonwebtoken")

router.use(bodyParser.json())

router.post('/', function(req, res) {
  const username = req.body.username 
  const password = req.body.password 
  //Authenticate user
  if(username != undefined && password != undefined) {
    const user = { uname: username, pass: password }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToke: accessToken })
  }
  res.status(404).send("Invalid Input")
}) 

module.exports = router 
