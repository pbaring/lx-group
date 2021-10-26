
const express = require('express');
const router = express.Router();
  
 /**
 * @api {get} /api/sort-words Sort Words
 * @apiName sort-words 
 * @apiGroup api
 * @apiParam {String} sentence.
 * @apiSuccess (Success 200) {String} sorted sentence
 */
  router.get('/', (req, res) => {
  
    //accessing get parameters
    var sentence = req.query.sentence;
    var sorted = sentence.split(/(\s|,|\.|\?|\"|\!)/).map(function(text) {
        return text.split('').sort((a,b) => a.localeCompare(b)).join('')
      }).join('');
  
      res.json(sorted);
  });



  module.exports = router;