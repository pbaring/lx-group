
const express = require('express');
const router = express.Router();

  
//with parameters
router.get('/', (req, res) => {

    //accessing get parameters
    var sentence = req.query.sentence;
    
    var reversedSentence = sentence.split(/(\s|,|\.|\?|\"|\!)/).map(function(text) {
        return text.split('').reverse().join('')
      }).join('');

    res.json(reversedSentence);
});

module.exports = router;