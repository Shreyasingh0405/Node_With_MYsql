const express = require("express");
const routes = require("./routes/routes");
const sequelize = require("./database");
const app = express();
const port = 4000;

// Use Express.json middleware
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    console.log("all models were synchronized successfully");
}).catch(error => {
    console.log("error occurred during model synchronization:", error);
});

app.use("/", routes);

app.listen(port, () => {
    console.log("server is running on the port " + `${port}`);
});
