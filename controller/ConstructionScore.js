
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

const addConstructionScore=async (req, res) => {
    try {
    const { data } = req.body;

    // 🔍 Validate total objects
    if (!Array.isArray(data) || data.length !== 5) {
      return res.status(400).json({
        error: "Exactly 5 objects required"
      });
    }

    const formattedData = data.map((item, index) => {
      const { mainCriteria, subCriteriaScore } = item;

      // 🔍 Validate mainCriteria
      if (!mainCriteria || typeof mainCriteria !== "string") {
        throw new Error(`Invalid mainCriteria at index ${index}`);
      }

      // 🔍 Validate subCriteria
      if (!Array.isArray(subCriteriaScore) || subCriteriaScore.length !== 15) {
        throw new Error(`Each object must have 15 subCriteria (index ${index})`);
      }

      const formattedSub = subCriteriaScore.map(sub => {
        const name = sub.name;
        const value = Number(sub.value);

        return {
          name,
          value: Number(value.toFixed(3)) // 3 decimal precision
        };
      });

      return {
        mainCriteria,
        subCriteriaScore: formattedSub
      };
    });

    // 💾 Insert all at once
    const savedData = await modelConstruction.insertMany(formattedData);

    res.status(201).json({
      message: "All 5 Construction Method Scores saved successfully",
      data: savedData
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}

module.exports={getAllConstructionMethods,addConstructionScore}