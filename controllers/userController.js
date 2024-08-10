const User = require('../models/user');

//Create a new User:
const createUser = async(req,res)=>{
    const{name, email, age, password} = req.body;

    if(!name || !email || !age || !password){
        return res.status(400).json({code: 300, message : 'Invalid Data'});
    }

    if(name.length < 5 || name.length > 10){
        return res.status(400).json({code: 301, message : 'Invalid name'});
    }

    if(password.length < 5 || password.length > 10){
        return res.status(400).json({code: 302, message : 'Invalid Password'});
    }

    if(age < 18){
        return res.status(400).json({code: 303, message : 'Invalid Age'});
    }

    try {
        const newUser = new User({name, email, age, password});
        const savedUser = await newUser.save();
        res.status(201).json({code: 201 , message : savedUser});
    }catch(error){
        res.status(500).json({message : 'Error Creating User', error});
    }
};

//Get all users
const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message : 'Error fetching all users', error});
    }
};

//Get users by age
const getUsersByAge = async(req,res)=>{
    const age = parseInt(req.params.age);
    try{
        const users = await User.find({age});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Error fetching users', error});
    }
};

//Get Users above a certain age
const getUsersAboveAge = async(req,res)=>{
    const age = parseInt(req.params.age);
    try{
        const users = await User.find({age: {$gt: age}});  //gt stands for greater than
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Error fetching users', error});
        

    }
};

//Get Users by Name
const getUserByName = async(req,res)=>{
    const name = req.params.name;
    try{
        const users = await User.find({name: new RegExp(name , 'i')});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Error fetching users', error});
    }
};

//Get Users Ordered By Name
const getUsersOrderedByName = async(req,res)=>{
    try{
        const users = await User.find().sort({name : 1});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Error fetching users', error});
    }
};

//Update a user by Id
const updateUser = async(req,res)=>{
    const {id} = req.params;
    const {name, email, age, password} = req.body;

    if(!name || !age || !password || !email){
        return res.status(400).json({code : 300 , message: 'Invalid Data'});
    }

    if(name.length < 5 || name.length > 10){
        return res.status(400).json({code : 301, message: 'Invalid Data'});
    }

    if(password < 5 || password > 10){
        return res.status(400).json({code : 302, message:'Invalid Data'});
    }

    if(age < 18){
        return res.status(400).json({code : 303, message:'Invalid Data'});
    }

    try{
        const updateUser = await User.findByIdAndUpdate(id,{name, email, age, password},{new : true});
        if(!updateUser){
            return res.status(404).json({code : 404, message: 'User not found'});
        }
        res.status(200).json({code : 201, message: updateUser});
        }catch(error){
            res.status(500).json({message : 'Error Updating User', error});
        }      
    };

//Delete a User by Id
const deleteUser = async(req,res)=>{
    const{id} = req.params;

    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({code : 404 , message : 'User Not FOund'});            
        }
        res.status(200).json({message : deleteUser});  
    }catch(error){
        res.status(500).json({message: 'Error Deleting User', error});
        
    }
};

//Delete Users by Email
const deleteUsersByEmail = async(req,res)=>{
    const {email} = req.params;
    try{
        const deletedUsers = await User.deleteMany({email});
        res.status(200),json({message: deletedUsers});
    }catch(error){
        res.status(500).json({message : 'Error deleting users',error});

    }
};

module.exports= {
    createUser,
    getAllUsers,
    getUserByName,
    getUsersAboveAge,
    getUsersByAge,
    getUsersOrderedByName,
    updateUser,
    deleteUser,
    deleteUsersByEmail
};

