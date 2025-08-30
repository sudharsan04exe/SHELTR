const mongoose=require("mongoose")

const model=mongoose.model;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'vendor'], default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});

const usermodel=new model("Users", userSchema);

module.exports=usermodel;