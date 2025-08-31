require('dotenv').config();
const connectDB = require('./database/db'); 

const app=require("./app")


const PORT =process.env.PORT || 3000; 

connectDB();

app.listen(PORT,()=>{
    console.log("server listening on port:" ,PORT);
})