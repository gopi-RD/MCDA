
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
  /*try {
    let { constructionMethod, subCriteriaScore } = req.body;
       console.log(subCriteriaScore[0].length)
    // ✅ AUTO GENERATE if missing (IMPORTANT FIX)`
    if (!constructionMethod) {
      const count = await modelConstruction.countDocuments();
      constructionMethod = `Method-${count + 1}`;
    }

    // ✅ Validate subConstructionScore
    if (!Array.isArray(subCriteriaScore) || subCriteriaScore.length !== 15) {
      return res.status(400).json({
        error: "Exactly 15 items required"
      });
    }

    // ✅ Format data
    const formatted = subCriteriaScore.map(item => ({
      name: item.name,
      value: Number(Number(item.value).toFixed(3))
    }));

    // ✅ UPSERT (no duplicate error)
    const result = await modelConstruction.insertMany(
      { constructionMethod },
      { subCriteriaScore: formatted }
    );

    res.status(200).json({
      message: "Saved successfully",
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  } */ 

    try {
    const { data } = req.body;

    // 🔍 Validate input
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        error: "Data array is required"
      });
    }

    const formattedData = data.map((item, index) => {
      const { constructionMethod, subCriteriaScore } = item;

      // 🔍 Validate method
      if (!constructionMethod) {
        throw new Error(`Missing constructionMethod at index ${index}`);
      }

      // 🔍 Validate 15 items
      if (!Array.isArray(subCriteriaScore) || subCriteriaScore.length !== 15) {
        throw new Error(`Exactly 15 items required for ${constructionMethod}`);
      }

      // 🔧 Convert values
      const formattedSub = subCriteriaScore.map(sub => {
        const value = Number(sub.value);

        if (isNaN(value)) {
          throw new Error(`Invalid number in ${constructionMethod}`);
        }

        return {
          name: sub.name,
          value: Number(value.toFixed(3))
        };
      });

      return {
        constructionMethod:constructionMethod,
        subCriteriaScore: formattedSub
      };
    });

    // 💾 INSERT MANY
    const result = await modelConstruction.insertMany(formattedData);

    res.status(201).json({
      message: "Inserted successfully",
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports={getAllConstructionMethods,addConstructionScore}