const express =require("express")


const authroute=require("./routes/auth");
const userroutes=require("./routes/users")
const listingroutes=require("./routes/listings")
const bookingroutes=require("./routes/bookings")


const app=express();
app.use(express.json());

app.use("/api/auth",authroute);
app.use("/api/users",userroutes);
app.use("/api/listing",listingroutes);
app.use("/api/bookings",bookingroutes);

module.exports = app;