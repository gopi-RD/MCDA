
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

const addMultipleCriteria = async (req, res) => {
  try {
    const { data } = req.body;

    // 🔍 Validate total objects
    if (!Array.isArray(data) || data.length !== 15) {
      return res.status(400).json({
        error: "Exactly 15 objects required"
      });
    }

    const formattedData = data.map((item, index) => {
      const { mainCriteria, subCriteria } = item;

      // 🔍 Validate mainCriteria
      if (!mainCriteria || typeof mainCriteria !== "string") {
        throw new Error(`Invalid mainCriteria at index ${index}`);
      }

      // 🔍 Validate subCriteria
      if (!Array.isArray(subCriteria) || subCriteria.length !== 5) {
        throw new Error(`Each object must have 5 subCriteria (index ${index})`);
      }

      const formattedSub = subCriteria.map(sub => {
        const name = sub.name;
        const value = Number(sub.value);

        if (!name || typeof name !== "string") {
          throw new Error(`Invalid subCriteria name in ${mainCriteria}`);
        }

        if (isNaN(value) || value < 1 || value > 9) {
          throw new Error(`Value must be 1–9 in ${mainCriteria}`);
        }

        return {
          name,
          value: Number(value.toFixed(3)) // 3 decimal precision
        };
      });

      return {
        mainCriteria,
        subCriteria: formattedSub
      };
    });

    // 💾 Insert all at once
    const savedData = await Criteria.insertMany(formattedData);

    res.status(201).json({
      message: "All 15 criteria saved successfully",
      data: savedData
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};


module.exports={getAllEmployees,addMultipleCriteria}