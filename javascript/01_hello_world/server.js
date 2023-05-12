const express = require("express");
//init express into a variable
let app = express();

//make a static web server and listen to port 3000
app.use("/",express.static("public"));
app.listen(3000);

console.log("Running in port 3000 🤖");