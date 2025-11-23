const express=require("express");
const dotEnv=require("dotenv");
var bcrypt=require('bcryptjs');
const bodyParser=require("body-parser");

const organisationRoutes=require('./routes/organisationRoutes');
const userRoutes=require("./routes/userRoutes");
const employeeRoutes=require("./routes/employeeRoutes");
const teamRoutes=require("./routes/teamRoutes");

const errorHandler=require('./middlewares/errorHandler');
const cors=require('cors');


const app=express()
dotEnv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/organisation',organisationRoutes);
app.use('/api/users',userRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api/teams', teamRoutes);


app.get('/',(req,res)=>{
    res.send("<h1>Welcome to HRMS")
})


app.use(errorHandler);

const PORT=process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`Server started and running at ${PORT}`);
})
