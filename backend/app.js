const express =require("express")


const authroute=require("./routes/auth");
const userroutes=require("./routes/users")
const listingroutes=require("./routes/listings")


const app=express();

app.use("/api/auth",authroute);
app.use("/api/users",userroutes);
app.use("/api/listing",listingroutes);

module.exports = app;