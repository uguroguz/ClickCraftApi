User = require('../models/users');


//Get All users -> can be used to see server statics
function GetAllUsers(req, res){
    User.find({}, (err, users)=>{
        if(err){
            res.status(500).json({
                message:"Server Error-> userController/GetAllUsers"
            });
        }
        else{
            res.status(200).json({
                message:"All users",
                users
            });
        }
    });
}

//Get user
function GetUser(req, res){
    var query = {_id: req.query._id};
    User.findOne(query, (err, user)=>{
        if(err){
            res.status(500).json({
                message:"Server Error-> userController/GetAllUsers"
            });
        }
        else{
            res.status(200).json({
                message:"user",
                user
            });
        }
    });
}

//Create User 
//handled in app-> signin

//Edit user
//Only to update password
function EditUser(req, res){   

    //checking credentials
    if(!req.body._id || !req.body.password){
        res.status(400).json({
            message:"_id or password is missing, please be sure all credentials are entered"
        });
    }
    else{
        var query ={_id: req.body._id};        
        var update = {
            $set:{
                "password" : req.body.password
            }
        };
        User.findOneAndUpdate(query, update, (err, result) =>{
            if(err){               
                res.status(500).json({
                    message:"Something went wrong, check userController/Edituser"
                });
            }
            else{
                //meaning user exist
                if(result){
                    res.status(200).json({
                        message: "password has been updated successfulls"                   
                    });
                }
                else{
                    res.status(200).json({
                        message: "User doesn't exists"
                    });
                }            
            }
        });
    }    
}

//There wont be delete function

module.exports ={
    GetAllUsers,
    GetUser,
    EditUser
};