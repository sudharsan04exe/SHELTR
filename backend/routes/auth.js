const express=require("express")
const router=express.Router();

const { validateRegister,validateLogin}=require ('../utils/validators')
const {validateRequest}=require ('../middleware/validation')


// considering the body is validated on middleware
router.post("/api/auth/register",validateRegister,validateRequest,(req,res)=>{

})

router.post("/api/auth/login",validateLogin,validateRequest,(req,res)=>{
    
})

router.post("/api/auth/logout",(req,res)=>{
    
})
router.get("/api/auth/profile",(req,res)=>{
    
})
router.put("/api/auth/profile",(req,res)=>{
    
})

module.exports =router;