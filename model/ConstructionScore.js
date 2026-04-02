const mongoose= require('mongoose');
const subSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});
const constructionSchema = new mongoose.Schema({
  constructionMethod: {
    type: String,
    required:true,
      
  },
  subCriteriaScore: {
    type: [subSchema],
    validate: [
      arr => arr.length === 15,
      "Exactly 15 sub-criteria required"
    ]
  }
});




const method = mongoose.model('ConstructionScore', constructionSchema);
module.exports = method;