var express = require('express');
var router = express.Router();
var jimp = require('jimp')
var bodyParser = require('body-parser')
var wt = require("../utilities/webtokens.js")

router.use(bodyParser.json())

router.get('/', function(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.status(401).send("No token found in request")

  wt.authenticateToken(token, (err, user) => {
    if(err != null) return res.status(403).send("Invalid token")
      const imgUrl = req.body.url
      jimp.read(imgUrl, (err, image) => {
        if(err != null) return res.status(404).send("Image not found") 
        image.resize(50,50).getBase64(jimp.AUTO, (err, uri)=> {
          if(err != null) return res.status(404).send("Image not found")
          res.send(uri)
        })
      })
  })
});

module.exports = router;
