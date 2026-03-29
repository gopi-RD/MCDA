
const modelCriteria=require("../model/CriteriaOfSCE");


// Get All Employees
const getAllEmployees=async (request, response) => {
    try{

        const getCriteria= await modelCriteria.find({}) 
        response.status(200).json(getCriteria)

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


// Get Employee by ID 

// Add New Employee 

const addEmployee=async (request, response) => {
    try{
        const { mainCriteria, subCriteria } = request.body;

        const newEmployee = new modelCriteria({
            mainCriteria,
            subCriteria
        });

    
        await newEmployee.save()
        response.status(201).json({message:`Successfully created Sub Criteria`})

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


module.exports={getAllEmployees,addEmployee}