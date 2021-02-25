const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SkillController = require('../controllers/skillController');

//Get All Skill
router.get('/', SkillController.GetAllSkill);
//Get One Skill
router.get('/skill', SkillController.GetSkill);
//Add Skill
router.post('/add',verifyToken, SkillController.AddSkill);
//Edit Skill
router.post('/edit',verifyToken, SkillController.EditSkill);
//Remove Skill
router.delete('/remove',verifyToken,SkillController.RemoveSkill);

//NOT: Verift Token works remember to change token when using postman
//verify Token
function verifyToken(req, res, next){    
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if Bearer is undefined
    if(typeof bearerHeader !== 'undefined' ){
        //split at space
        const bearer =bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set  the token
        req.token = bearerToken;
        
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                //Forbidden-> token is not right// or expired 
                res.sendStatus(403);
            }
            else{
                //Next  middleware                             
                next();               
            }
        });
    }
    else{
        //Forbiden
        res.sendStatus(403);        
    }
}

module.exports = router;