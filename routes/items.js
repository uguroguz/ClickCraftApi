const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ItemController = require('../controllers/itemController');

//Get All item
router.get('/', ItemController.GetAllItem);
//Get item
router.get('/item', ItemController.GetItem);
//Add Item
router.post('/add', verifyToken, ItemController.AddItem);
//Edit Item
router.post('/edit', verifyToken, ItemController.EditItem);
//Remove Item
router.delete('/remove',verifyToken, ItemController.RemoveItem);


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