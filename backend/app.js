const express =require("express")


const authroute=require("./routes/auth");
const userroutes=require("./routes/users")


const app=express();

app.use("/api/auth",authroute);
app.use("/api/users",userroutes);

module.exports = app;