const {Sequelize} = require("sequelize")
 const sequelize = new Sequelize("userdatabase","root","Shree@2001",{
    host:"127.0.0.1",
    dialect:"mysql"
 })
  sequelize.authenticate().then(()=>{
    console.log("Mysql connection establised successfully");
 })
 .catch(err=>{
    console.error("unable to connect db",err)
 });

 module.exports=sequelize