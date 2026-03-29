const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        
    },
    jobTitle:{
        type:String,
        required:true,
    },
    organization:{
        type:String,
        require:true
    },
    areaOfExpertise:{
        type:String,
        require:true
    },
    yearsOfExperience:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    }


})


const User = mongoose.model('User',userSchema);
module.exports = User;