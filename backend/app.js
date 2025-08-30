const express =require("express")


const authroute=require("./routes/auth");


const app=express();

app.use("/api/auth",authroute);

module.exports = app;