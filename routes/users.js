const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/userController');
//Get All
router.get('/',verifyToken , UserController.GetAllUsers);
//Get One
router.get('/profile', verifyToken, UserController.GetUser);
//Edit user
router.post('/edit', verifyToken, UserController.EditUser);

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

