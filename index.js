const express=require("express")
const app = express()
const dotEnv=require("dotenv")
const mongoose=require("mongoose") 
const cors=require("cors")
const PORT= process.env.PORT|| 3000
 //console.log(process.env)
const userRoutes=require("./routes/User") 
const criteriaRoutes=require("./routes/CriteriaOfSCE")
const constructionRoutes = require("./routes/ConstructionScore")

dotEnv.config()

 app.use(express.json())
app.use(cors())
app.use("/api",userRoutes)
app.use("/api",criteriaRoutes)
app.use("/api",constructionRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log(`DB Error is ${error}`));
app.listen(PORT,()=>{
    console.log(`Server  is running on port ${PORT}`)
})

app.get("/",(request,response)=>{
    response.send("Welcome to Deals Dray Assignment!")
})


