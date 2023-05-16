const express = require("express");
let app = express();

app.use(express.json());
app.use("/", express.static("public"));

//DATABASE

let database = [];
let id = 100;

/* contact Object
firstname:string,
lastname:string,
email:string,
phone:string,
id:number
*/

//REST API

/*
CREATE - POST "api/contact"
READ - GET "api/contact"
UPDATE - PUT "api/contact/:id"
DELETE - DELETE "api/contact/:id"
*/

//READ whole database from api/contact (status 200 == OK)
app.get("/api/contact", function (req, res) {
  return res.status(200).json(database);
});

//POST create a new contact in the database (status 201 == CREATED)
app.post("/api/contact", function (req, res) {
  let contact = {
    id: id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  //auto increment id
  id++;
  database.push(contact);
  return res.status(201).json(contact);
});

//DELETE from the database
app.delete("/api/contact/:id", function (req, res) {
  let tempId = parseInt(req.params.id);
  database = database.filter(contact => contact.id !== tempId);
  return res.status(200).json({ message: "success" });
});

//PUT - edit a contact in database
app.put("/api/contact/:id", function (req, res) {
  let tempId = parseInt(req.params.id);
  let contact = {
    id: tempId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone
  };
  for (let i = 0; i < database.length; i++) {
    //if id maches the id in database, edit the object
    if (tempId === database[i].id) {
      database.splice(i, 1, contact);
      return res.status(200).json({ "message": "success" })
    }
  }
  return res.status(404).json({ "message": "not found" });
});

app.listen(3000);
console.log("Running in port 3000 🤖");
