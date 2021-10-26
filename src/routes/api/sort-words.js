
const express = require('express');
const router = express.Router();


  
  //with parameters
  router.get('/', (req, res) => {
  
    //accessing get parameters
    var sentence = req.query.sentence;
    var sorted = sentence.split(/(\s|,|\.|\?|\"|\!)/).map(function(text) {
        return text.split('').sort((a,b) => a.localeCompare(b)).join('')
      }).join('');
  
      console.log(sorted);
      res.send(sorted);
  });



  module.exports = router;