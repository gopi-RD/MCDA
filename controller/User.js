const User=require("../model/User")
//const bcrypt=require("bcrypt")
//const jwt=require("jsonwebtoken")

const dotEnv=require("dotenv")

dotEnv.config()

//const SCRECT_KEY=process.env.SCRECT_KEY

/*const UserRegisteration=async (request, response) =>{
    
    try{
        const {username,password}=request.body 
        
        // Check if user already exists 
        const user=await User.findOne({username})
        if(user){
            return response.status(400).json({error_msg:"User already exists"})
        }
        // Hash the password 
        const hashPassword=await bcrypt.hash(password,10)
        // Create a new user 
        let newUser=new User({
            username,
            password:hashPassword
        })
        
        // Save the user to the database 
        await newUser.save() 
        response.status(201).json({message:`User saved successfully`})
        console.log("User saved successfully")
    }
    catch(error){
        response.status(500).json({error_msg:`Server error ${error}`}) 
        console.log(`error: ${error}`)
    }
} */


const UserProfileDetails=async (request, response) => {
    try{
        const {fullName,jobTitle,organization,areaOfExpertise,yearsOfExperience,qualification} = request.body  
        
         const userDetails=new User({
            fullName,
            jobTitle,
            organization,
            areaOfExpertise,
            yearsOfExperience,
            qualification
            
        })
        const user = await userDetails.save()
        response.status(201).json({message:`Successfully created User Details`})

    }
    catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
 
}


const getAllUsers=async(request,response)=>{
    try{
        const users=await User.find({})
        response.status(200).json(users)
    }
    catch(error){
        response.status(500).json({error_msg:`Server error ${error}`})
    }
}

module.exports={UserProfileDetails,getAllUsers}