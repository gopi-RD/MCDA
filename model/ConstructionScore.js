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
  mainCriteria: {
    type: String,
    required: true,   // ⚠️ fix typo (require → required)
    unique: true
  },
  subCriteriaScore: {
    type: [subSchema],
    validate: [
      arr => arr.length === 15,
      "Exactly 15 sub-criteria required"
    ]
  }
});




const User = mongoose.model('ConstructionScore', constructionSchema);
module.exports = User;