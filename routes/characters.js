const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const CharacterController = require('../controllers/characterController');

//Get All Characters
router.get('/', CharacterController.GetAllCharacter);
//Get Character
router.get('/avatar', verifyToken, CharacterController.GetCharacter);
//Edit Character
router.post('/edit', verifyToken, CharacterController.EditCharacter);

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
                req.authData = authData;                
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