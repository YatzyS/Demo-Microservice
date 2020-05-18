var express = require('express');
var router = express.Router();
var wt = require("../utilities/webtokens.js")

router.get('/', function(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.status(401).send("No token found in request")

  wt.authenticateToken(token, (err, user) => {
    if(err != null) return res.status(403).send("Invalid token")
    res.send(user)
  })
});

module.exports = router;
