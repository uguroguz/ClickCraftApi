Character = require('../models/characters');

//getAll
function GetAllCharacter(req, res){
    Character.find({}, (err, characters) => {
        if(err){
            res.status(500).json({
                meesage:"Server Error-> characterController/GetAllcharacter"
            });
        }
        else{            
            res.status(200).json({
                message: 'All Characters',
                characters
            });
        }        
    });
}

//getOne
//returns "user avatar", considering other users arent seeing this part
//we will extract username from token so we dont require any parameters
//NOT: dont mix "character _id" and "user _id"
function GetCharacter(req, res){ 
    //authData comes from verify token-> character router.
    var username = req.authData.user.username;    
    var query = { username: username};
    Character.findOne(query , (err, character) => {
        if(err){            
            res.status(500).json({
                meesage:"Server Error-> characterController/Getcharacter"
            });
        }
        else{        
            if(character){
                res.status(200).json({
                    message: 'Character',
                    character
                });
            }
            else{
                res.status(200).json({
                    message: 'character Not found',
                    character                    
                });
            }            
        }        
    });
}

//add character
//Not used: every user can have 1 character, characters are created in register

//update
//Add item to inventory, edit skills etc.
function EditCharacter(req, res){

    var query = {_id: req.body._id};
    var update = {
        $set: req.body
    };

    Character.findOneAndUpdate(query, update, (err, result) =>{
        if(err){            
            res.status(500).json({
                message:"Something went wrong, check characterController/EditCharacter"
            });
        }
        else{
            //meaning character exist
            if(result){
                res.status(200).json({
                    message: "Character has been updated successfulls"                   
                });
            }
            else{
                res.status(200).json({
                    message: "Character doesn't exists"
                });
            }            
        }
    });
}
//delete function is used in user controller because when we delete user we want to remove related character
//there is no merit for user deleting there character and starting over.


module.exports = {
    GetAllCharacter,
    GetCharacter, 
    EditCharacter    
}