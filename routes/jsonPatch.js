var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jpatch = require('jsonpatch')
var wt = require("../utilities/webtokens.js")

router.use(bodyParser.json())

router.get('/', function(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.status(401).send("No token found in request")

  wt.authenticateToken(token, (err, user) => {
    if(err != null) return res.status(403).send("Invalid token")
    const json = req.body.json
    const patch = req.body.patch
    console.log(json,patch)
    applypatch(json, patch, (patchedjson) => {
        res.send(patchedjson)
    })
  })
});

function applypatch(json, patch, callback) {
  callback(jpatch.apply_patch(json, patch))
}

module.exports = router;
