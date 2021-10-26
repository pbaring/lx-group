
const express = require('express');
const router = express.Router();

  
//with parameters
router.get('/', (req, res) => {

    //accessing get parameters
    var sentence = req.query.sentence;
    //res.json(`Sentence: ${sentence}`);

    //var reversedSentence = Array.prototype.reverse(sentence);

    var reversedSentence = sentence.split(/(\s|,|\.|\?|\"|\!)/).map(function(text) {
        return text.split('').reverse().join('')
      }).join('');

    res.send(reversedSentence);
});

module.exports = router;