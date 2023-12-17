const express=require("express")
const routes= express.Router()
const controller=require("../controllers/user")
const validation=require("../Validations/user")
routes.post("/user",validation.userValidation,controller.userRegistration)
routes.get("/user",controller.getUserData)
module.exports=routes