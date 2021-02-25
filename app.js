const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myuo', { useNewUrlParser: true,  useUnifiedTopology: true} );
var db = mongoose.connection;

//Check connection
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});


//Check for Db errors
db.on('error', (err) =>{
    console.log(err);
});

//Init App
const app = express();

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//token
const jwt = require('jsonwebtoken');

//Bring in Model -> signin/signup
var User = require('./models/users');
var Character =require('./models/characters');

app.get('/api', (req, res) =>{
    res.status(200).json({
        message: "Welcome to Api",
        access_points:["api/skills/crud","api/items/crud","api/characters/crud","api/users/crud"]
    });
});

//Login
app.post('/api/login', (req, res) =>{
    //find user
    var query ={
        username: req.body.username,
        password: req.body.password
    };

    User.findOne(query, (err, user)=>{
        if(err){
            res.status(500).json({
                message:"Server Error-> app/Login"
            });
        }
        else{
            if(!user){
                res.json({
                    message:"user not found" //-> es6 style
                    //token: token
                });
            }
            else{
                //sendinbg payload, secret key, async version so using callback
                //can change token expire time check jwt documentation            
                jwt.sign({user}, 'secretkey',{expiresIn: '1 day'}, (err, token) => {                
                    res.json({
                        token //-> es6 style
                        //token: token
                    });
                });
            }
            
           
        }
    });
});

//Register
app.post('/api/register', (req,res) =>{
    //check if user exist
    var query = { 
        $or:[
            {username: req.body.username},
            {mail: req.body.mail}
        ] 
    };
    
    User.findOne(query, (err, user)=>{
        if(err){
            res.status(500).json({
                message:"Server Error-> app/register"
            });
        }
        else{
            //User exists
            if(user){
                res.status(200).json({
                    message:"Username or Mail Address on use", 
                });
            }
            else{                      
                //default creation of character
                var character ={
                    username: req.body.username,
                    coin: 30
                };
                var user = req.body;   

                var createUser = User.create(user);
                var createCharacter = Character.create(character);

                Promise.all([createUser, createCharacter])
                .then(response =>{                  
                    //response0 -> result of createUser
                    //response1 -> result of createcharacter
                    
                    //sendinbg payload, secret key, async version so using callback
                    //can change token expire time check jwt documentation
                    user= response[0];                    
                    jwt.sign({user}, 'secretkey',{expiresIn: '1 day'}, (err, token) => {                                             
                        res.status(200).json({
                            message:"User Created",                                
                            token //-> es6 style
                            //token: token
                        });
                    });                  

                }).catch(error => {                    
                    if(error.response.status(400)){
                        res.status(400).json({
                            message:"Not found -> please check App/Register- Promise"
                        });
                    }
                    else{
                        res.status(500).json({
                            message:"Something went wrong-> check App/Register"
                        })
                    }
                   
                });              
            }
           
        }
    });

});

//Format  Of Token
//Authorization: Bearer <access_token>

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
        //Next  middleware
        next();
    }
    else{
        //Forbiden
        res.sendStatus(403);
    }
}

//Routers
var skills = require('./routes/skills');
app.use('/api/skills', skills);
var items = require('./routes/items');
app.use('/api/items', items);
var characters = require('./routes/characters');
app.use('/api/characters', characters);
var users = require('./routes/users');
app.use('/api/users', users);


app.listen(5000, () => console.log('Server Started on 5000...'));