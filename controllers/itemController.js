Item = require('../models/items');

//getAll
function GetAllItem(req, res){ 

    Item.find({}, (err, items) => {
        if(err){            
            res.status(500).json({
                meesage:"Server Error-> itemController/GetAllItem"
            });
        }
        else{            
            res.status(200).json({
                message: 'All items',
                items
            });
        }
        
    });
}

//getOne
function GetItem(req, res){
    if(!req.query.id){
        res.status(400).json({
            message: 'Bad Request,Missing id'           
        });
    }
    else{
        var query = { _id: req.query.id };
        Item.findOne(query , (err, item) => {
            if(err){                
                //This means that user entered something that doesnt meet the requirements of the query
                if(err.response == undefined){
                    res.status(400).json({
                        meesage:"The Id you have entered is not valid. Caught in security-> itemController/GetItem"
                    });
                }
                else{
                    res.status(500).json({
                        meesage:"Server Error-> itemController/GetItem"
                    });
                }
               
            }
            else{           
                res.status(200).json({
                    message: 'item',
                    item
                });
            }
            
        });
    }
    
}

//add
function AddItem(req, res){

    var item = req.body; 
    //check if item exist
    var query = {
        itemName: item.itemName
    };

    Item.findOne(query, (err, result)=>{
        if(err){                   
            res.status(500).json({
                meesage:"Server Error-> itemController/AddItem"
            });
        }
        else{            
            if(result){
                res.status(200).json({
                    message:"Item Already Exist"
                });
            }
            else{
                Item.create(item, (err) =>{
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            meesage:"Server Error-> itemController/AddItem"
                        });
                    }
                    else{
                        res.status(200).json({
                            message: 'Item Added',
                            item
                        });
                    }
                });
            }
        }
    });
}

//update
function EditItem(req, res){

    var query = {_id: req.body._id};
    var update = {
        $set: req.body
    }; 
    Item.findOneAndUpdate(query, update, (err, result) =>{
        if(err){
            console.log(err);
            res.status(500).json({
                message:"Something went wrong, check itemController/EditItem"
            });
        }
        else{
            //meaning item exist
            if(result){
                res.status(200).json({
                    message: "Item has been updated successfulls"                   
                });
            }
            else{
                res.status(200).json({
                    message: "Item doesn't exists"
                });
            }            
        }
    });
}

//delete
function RemoveItem(req, res){
    var query = {_id: req.body._id};
    Item.deleteOne(query, (err, result) =>{
        if(err){            
            res.status(500).json({
                message:"Something went wrong, check itemController/RemoveItem"
            });
        }
        else{
            //if skill doesnt exist result->{ n: 0, ok: 1, deletedCount: 0 } else n & deletedCount -> 1
            if(result.n == 0){
                res.status(200).json({
                    message:"Item doesn't exists"
                });
            }
            else{
                res.status(200).json({
                    message:"Item have been removed"
                });
            }
        }
    });
}


module.exports = {
    GetAllItem,
    GetItem,    
    AddItem,
    EditItem,
    RemoveItem
}