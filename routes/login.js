var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var wt = require("../utilities/webtokens.js")


router.use(bodyParser.json())

router.post('/', function(req, res) {

  //Authenticate user
  if(!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {
    res.status(404).send("Invalid Input")
  }
  const user = { uname: req.body.username, pass: req.body.password }
  const accessToken = wt.getWebToken(user)
  res.json({ accessToke: accessToken })
}) 

module.exports = router 
