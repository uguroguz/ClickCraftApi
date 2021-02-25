Skill = require('../models/skills');

//getAll
function GetAllSkill(req, res){ 

    Skill.find({}, (err, skills) => {
        if(err){            
            res.status(500).json({
                meesage:"Server Error-> skillController/GetAllSkill"
            });
        }
        else{
            res.status(200).json({
                message: 'All Skills',
                skills
            });
        }
        
    });
}

//getOne
function GetSkill(req, res){ 
    var query = { _id: req.query.id };
    Skill.find(query , (err, skills) => {
        if(err){
            if(err.response == undefined){
                res.status(400).json({
                    meesage:"Server Error-> Id doesnt meet the requirements. Caught in-> skillController/GetSkill"
                });
            }
            else{                
                res.status(500).json({
                    meesage:"Server Error-> skillController/GetSkill"
                });
            }
           
        }
        else{           
            res.status(200).json({
                message: 'Skill',
                skills
            });
        }        
    });
}

//add
function AddSkill(req, res){

    var skill = req.body; 
    //check if skill exist
    var query = {
        name: skill.name
    };

    Skill.findOne(query, (err, result)=>{
        if(err){                      
            res.status(500).json({
                meesage:"Server Error-> skillController/AddSkill"
            });
        }
        else{            
            if(result){
                res.status(200).json({
                    message:"Skill Already Exist"
                });
            }
            else{
                Skill.create(skill, (err) =>{
                    if(err){                        
                        res.status(500).json({
                            meesage:"Server Error-> skillController/AddSkill"
                        });
                    }
                    else{
                        res.status(200).json({
                            message: 'Skill Added',
                            skill
                        });
                    }
                });
            }
        }
    });
}
//update
function EditSkill(req, res){

    var skill = req.body;      
    var query = {_id: skill._id};
        
    var update ={
        $set: skill     
    };

    Skill.findOneAndUpdate(query, update, (err, result) =>{
        if(err){            
            res.status(500).json({
                message:"Something went wrong, check skillController/EditSkill"
            });
        }
        else{
            //meaning skill exist
            if(result){
                res.status(200).json({
                    message: "Skill has been updated successfulls"                   
                });
            }
            else{
                res.status(200).json({
                    message: "Skill doesn't exists"
                });
            }            
        }
    });
}
//delete
function RemoveSkill(req, res){
    var query = {_id: req.body._id};
    Skill.deleteOne(query, (err, result) =>{
        if(err){            
            res.status(500).json({
                message:"Something went wrong, check skillController/RemoveSkill"
            });
        }
        else{
            //if skill doesnt exist result->{ n: 0, ok: 1, deletedCount: 0 } else n & deletedCount -> 1
            if(result.n == 0){
                res.status(200).json({
                    message:"skill doesn't exists"
                });
            }
            else{
                res.status(200).json({
                    message:"Skill have been removed"
                });
            }
        }
    });
}


module.exports = {
    GetAllSkill,
    GetSkill,    
    AddSkill,
    EditSkill,
    RemoveSkill
}