
const userController=require("../controller/User")
const express = require('express');  
const routes=express.Router();


routes.post('/userProfile', userController.UserProfileDetails); 
routes.get("/users", userController.getAllUsers)

module.exports=routes;