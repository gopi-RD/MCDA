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
const criteriaSchema = new mongoose.Schema({
  mainCriteria: {
    type: String,
    required: true,   // ⚠️ fix typo (require → required)
    unique: true
  },
  subCriteria: {
    type: [subSchema],
    validate: [
      arr => arr.length === 5,
      "Exactly 5 sub-criteria required"
    ]
  }
});


const Data = mongoose.model('criteria', criteriaSchema);
module.exports = Data;
