

const criteriaController=require("../controller/CriteriaOfSCE");
//const authication=require("../middleware/verifyJWTToken")
const express = require("express"); 
const routes=express.Router(); 

routes.get("/criterias",criteriaController.getAllEmployees);
routes.post("/add-criteria",criteriaController.addMultipleCriteria);
 

module.exports=routes;