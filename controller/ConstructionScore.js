
const modelConstruction=require("../model/ConstructionScore");


// Get All Employees
const getAllConstructionMethods=async (request, response) => {
    try{

        const getCriteria= await modelConstruction.find({}) 
        response.status(200).json(getCriteria)

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}
// Get Employee by ID 

// Add New Employee 

const addConstructionScore=async (request, response) => {
    try{
       const { mainCriteria, subCriteriaScore } = request.body;

        const newEmployee = new modelConstruction({
            mainCriteria,
            subCriteriaScore
        });

            
        
        await newEmployee.save()
        response.status(201).json({message:`Successfully created Sub Criteria`})

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


module.exports={getAllConstructionMethods,addConstructionScore}