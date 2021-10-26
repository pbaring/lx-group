
const express = require('express');
const router = express.Router();

 /**
 * @api {get} /api/reverse-words Reverse Words
 * @apiName reverse-words 
 * @apiGroup api
 * @apiParam {String} sentence.
 * @apiSuccess (Success 200) {String} reversed sentence
 */
router.get('/', (req, res) => {

    //accessing get parameters
    var sentence = req.query.sentence;
    
    var reversedSentence = sentence.split(/(\s|,|\.|\?|\"|\!)/).map(function(text) {
        return text.split('').reverse().join('')
      }).join('');

    res.json(reversedSentence);
});

module.exports = router;