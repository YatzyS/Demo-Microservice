var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var wt = require("../utilities/webtokens.js")


router.use(bodyParser.json())

router.post('/', function(req, res) {
  const username = req.body.username 
  const password = req.body.password 
  //Authenticate user
  if(username != undefined && password != undefined) {
    const user = { uname: username, pass: password }
    const accessToken = wt.getWebToken(user)
    res.json({ accessToke: accessToken })
  }
  res.status(404).send("Invalid Input")
}) 

module.exports = router 
