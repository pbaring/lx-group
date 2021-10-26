
const express = require('express');
const router = express.Router();
const members= require('../../Members')


router.get('/', (req, res) => {

    //process and return
    //when returning data/model
    res.json(members);
  
  });
  
  //with parameters
  router.get('/:id', (req, res) => {
  
    //accessing get parameters
    var id = req.params.id;    
    const member = members.filter(m => m.id == id);
  
    //process and return  
    if(member.length > 0)
    {
      res.json(member);
    }
    else
    {
      //return error status
      res.status(400).json({msg: 'Member not found'});
    }
  
  });


  //create member


  module.exports = router;