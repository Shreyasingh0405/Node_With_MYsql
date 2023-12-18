const express = require("express");
const routes = require("./routes/routes");
const bodyParser=require("body-parser")
const multer=require("multer")
const sequelize = require("./helpers/databaseConnection");
const app = express();
const port = 4000;

// Use Express.json middleware
//app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().any()); 
sequelize.sync({ force: false }).then(() => {
    console.log("all models were synchronized successfully");
}).catch(error => {
    console.log("error occurred during model synchronization:", error);
});

app.use("/", routes);

app.listen(port, () => {
    console.log("server is running on the port " + `${port}`);
});
