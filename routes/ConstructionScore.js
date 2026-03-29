

const constructionController=require("../controller/ConstructionScore");
//const authication=require("../middleware/verifyJWTToken")
const express = require("express"); 
const routes=express.Router(); 

routes.get("/allConstructions",constructionController.getAllConstructionMethods);
routes.post("/addConstruction",constructionController.addConstructionScore);
 

module.exports=routes;